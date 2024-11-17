export const GET_CATEGORY_CARDS = `
    query {
        categories {
            name
            documentId
            icon {
                formats
                name
                documentId
            }
        }
    }
`;

export const GET_FILTERS = `
    query {
        categories {
            name
        }
        colors {
            name
        }
    }
`

export const GET_PRODUCT_CARDS = `
    query GetProductCards($categoryFilters: [String], $colorFilters: [String], $start: Int) {
        products(filters: {
            categories: { name: { in: $categoryFilters } }
            color: { name: { in: $colorFilters } }
        }, pagination: { start: $start, limit: 12 }) {
            name
            documentId
            price
            slug
            updatedAt
            isInStock
            image {
                name
                documentId
                formats
            }
        }
    }
`;

export const GET_PRODUCTS_SIZE = `
    query GetProductsSize($categoryFilters: [String], $colorFilters: [String]) {
        products(filters: {
            categories: { name: { in: $categoryFilters } }
            color: { name: { in: $colorFilters } }
        }, pagination: {limit: 100}) {
            isInStock
        }
    }
`;

export const GET_PRODUCT = `
    query GetProduct($documentId: ID!) {
        product(documentId: $documentId) {
            name
            documentId
            description
            isInStock
            price
            updatedAt
            color {
                name
            }
            categories {
                name
            }
            image {
                name
                documentId
                formats
            }
        }
    }
`;

export const GET_RELATED_PRODUCTS = `
    query GetRelatedProducts($documentId: ID!) {
        product(documentId: $documentId) {
            related_products {
                name
                documentId
                price
                image {
                    name
                    documentId
                    formats
                }
            }
        }
    }
`;