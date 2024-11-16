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
    query GetProductCards($categoryFilters: [String], $colorFilters: [String]) {
        products(filters: {
            categories: { name: { in: $categoryFilters } }
            color: { name: { in: $colorFilters } }
        }) {
            name
            documentId
            price
            slug
            updatedAt
            image {
                name
                documentId
                formats
            }
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