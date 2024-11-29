import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-10-28.acacia",
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            items,
            userId,
            address,
            city,
            country,
            zipCode,
            firstName,
            lastName,
            jwt,
            coupon,
            couponId,
            discount,
            reducedAmount,
        } = body;

        // Validate the request body
        if (!items || !Array.isArray(items)) {
            return NextResponse.json(
                { error: "Invalid cart data" },
                { status: 400 }
            );
        }

        if (!userId || !jwt) {
            return NextResponse.json(
                { error: "User ID and JWT are required" },
                { status: 400 }
            );
        }

        // Create the line items for the checkout session
        const lineItems = items.map((item) => ({
            price_data: {
                currency: "eur",
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        // Prepare the discounts array
        const discounts = [];
        if (coupon) {
            discounts.push({ coupon });
        } else if (discount) {
            discounts.push({ coupon: discount });
        }

        // Create the Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            ...(discounts.length > 0 && { discounts }), // Add discounts only if present
            mode: "payment",
            success_url: `${req.headers.get(
                "origin"
            )}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get("origin")}/cart`,
            metadata: {
                items: JSON.stringify(items),
                reducedAmount,
                userId,
                jwt,
                address,
                city,
                country,
                zipCode,
                firstName,
                lastName,
                ...(couponId && { couponId }), // Add couponId only if present
            },
        });

        // Return the checkout session ID
        return NextResponse.json({ stripeSessionId: session.id });
    } catch (err: any) {
        console.error("Error in checkout session:", err);
        return NextResponse.json(
            { error: err.message || "Internal server error" },
            { status: err.statusCode || 500 }
        );
    }
}
