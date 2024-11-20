import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-10-28.acacia",
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { items } = body;

        // Validate the cart data
        if (!items || !Array.isArray(items)) {
            return NextResponse.json(
                { error: "Invalid cart data" },
                { status: 400 }
            );
        }

        // Genearate line items for the checkout session
        const lineItems = items.map((item) => ({
            price_data: {
                currency: "eur",
                product_data: { name: item.name, images: [item.image] },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        // Create a new checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get("origin")}/cart`,
        });

        return NextResponse.json({ id: session.id });
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        );
    }
}
