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