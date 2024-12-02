import { CartItem } from "@/types/types";

// Format number to currency
export const formatNumber = (number: number) => {
    return new Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(number)
}

// Shorten the order ID
export const shortenOrderId = (orderId: string): string => {
    // Remove the prefix and keep only the last 8 characters
    const shortId = orderId.replace("#cs_test_", "").slice(-8);
    return `#${shortId}`;
}

export const areCartsEqual = (cart1: CartItem[], cart2: CartItem[]): boolean => {
    if (cart1.length !== cart2.length) {
        return false; // If the length of the carts are different, they are not equal
    }

    // Sort the carts by ID
    const sortedCart1 = [...cart1].sort((a, b) => a.id.localeCompare(b.id));
    const sortedCart2 = [...cart2].sort((a, b) => a.id.localeCompare(b.id));

    // Check if all items are equal
    return sortedCart1.every((item1, index) => {
        const item2 = sortedCart2[index];
        return (
            item1.id === item2.id &&
            item1.name === item2.name &&
            item1.image === item2.image &&
            item1.price === item2.price &&
            item1.quantity === item2.quantity
        );
    });
}