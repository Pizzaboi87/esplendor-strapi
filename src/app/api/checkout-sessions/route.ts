import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createOrder } from "@/utils/globalApi";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-10-28.acacia",
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { items, userId, address, city, country, zipCode, firstName, lastName, jwt } = body;

        // If the request body is invalid, return an error
        if (!items || !Array.isArray(items)) {
            return NextResponse.json(
                { error: "Invalid cart data" },
                { status: 400 }
            );
        }

        // If the user ID or JWT is missing, return an error
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

        // Create the checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${req.headers.get(
                "origin"
            )}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get("origin")}/cart`,
        });

        // Calculate the total price of the order
        const totalPrice = items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        // Create the order data to store in the database
        const orderData = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            country: country,
            zipCode: zipCode,
            price: totalPrice,
            date: new Date().toISOString(),
            orderID: session.id,
            products: items.map((item) => item.id),
            quantity: items.map((item) => ({
                [item.id]: item.quantity,
            })),
        };

        const orderResponse = await createOrder(jwt, orderData);

        // Return the checkout session ID and order data
        return NextResponse.json({ stripeSessionId: session.id, order: orderResponse });
    } catch (err: any) {
        console.error("Error in checkout session:", err);
        return NextResponse.json(
            { error: err.message || "Internal server error" },
            { status: err.statusCode || 500 }
        );
    }
}
