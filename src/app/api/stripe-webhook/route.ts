import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createOrder, updateUser } from "@/utils/globalApi";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-10-28.acacia",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
    const payload = await req.text();
    const sig = req.headers.get("stripe-signature");

    let event: Stripe.Event;

    try {
        if (!sig) throw new Error("Missing stripe-signature header");
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err: any) {
        console.error(`⚠️ Webhook signature verification failed.`, err.message);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        // Extract metadata
        const items = session.metadata?.items ? JSON.parse(session.metadata.items) : [];
        const jwt = session.metadata?.jwt;
        const address = session.metadata?.address;
        const city = session.metadata?.city;
        const country = session.metadata?.country;
        const userId = session.metadata?.userId;
        const zipCode = session.metadata?.zipCode;
        const firstName = session.metadata?.firstName;
        const lastName = session.metadata?.lastName;
        const discount = session.metadata?.reducedAmount;
        const couponId = session.metadata?.couponId;

        // Calculate total price
        const totalPrice = items.reduce(
            (total: number, item: { price: number; quantity: number }) => total + item.price * item.quantity,
            0
        );

        // Create order data
        const orderData = {
            firstName,
            lastName,
            address,
            city,
            country,
            zipCode,
            price: totalPrice,
            discount: discount || null,
            date: new Date().toISOString(),
            orderID: session.id,
            products: items.map((item: { id: string }) => item.id),
            quantity: items.map((item: { id: string; quantity: number }) => ({
                [item.id]: item.quantity,
            })),
        };

        try {
            // Create order in Strapi
            await createOrder(jwt as string, orderData);

            // Update user with used coupon ID if available
            couponId ? await updateUser(userId as string, { used_coupons: couponId }, jwt as string) : null;
        } catch (err) {
            console.error("Error creating order:", err);
        }
    }

    return NextResponse.json({ received: true }, { status: 200 });
}
