// Format number to currency
export const formatNumber = (number: number) => {
    return new Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(number)
}