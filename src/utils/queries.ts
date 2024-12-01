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
    query GetProductCards(
        $categoryFilters: [String], 
        $colorFilters: [String], 
        $start: Int, 
        $price: String, 
        $updatedAt: String,
        $stockStatus: Boolean
    ){
        products(filters: {
            categories: { name: { in: $categoryFilters } }
            color: { name: { in: $colorFilters } }
            isInStock: { eq: $stockStatus }
        }, 
        sort: [$price $updatedAt], 
        pagination: { start: $start, limit: 12 }) {
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
    query GetProductsSize(
        $categoryFilters: [String], 
        $colorFilters: [String],
        $stockStatus: Boolean
    ) {
        products(filters: {
            categories: { name: { in: $categoryFilters } }
            color: { name: { in: $colorFilters } }
            isInStock: { eq: $stockStatus }
        }, 
        pagination: {limit: 100}) {
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

export const CREATE_ACCOUNT = `
    mutation RegisterUser($input: UsersPermissionsRegisterInput!) {
        register(input: $input) {
            jwt
            user {
                username
                email
                id
            }
        }
    }
`;

export const CREATE_CART = `
    mutation CreateCart($input: CartInput!) {
        createCart(data: $input) {
            createdAt
        }
    }
`;

export const USER_LOGIN = `
    mutation LoginUser($input: UsersPermissionsLoginInput!) {
        login(input: $input) {
            jwt
            user {
                username
                email
                firstName
                lastName
                mobilePhone
                homePhone
                birthDate
                country
                address
                city
                zipCode
                id
                discount {
                    name
                    value
                    stripeID
                }
                used_coupons {
                    code
                }
            }
        }
    }
`;

export const GET_USER_BY_JWT = `
    query GetUserByJWT {
        me {
            username
            email
            firstName
            lastName
            mobilePhone
            homePhone
            birthDate
            country
            address
            city
            zipCode
            id
            discount {
                name
                value
                stripeID
            }
            used_coupons {
                code
            }
        }
    }
`;

export const FORGOT_PASSWORD = `
    mutation ForgotPassword($email: String!) {
        forgotPassword(email: $email) {
            ok
        }
    }
`;

export const RESET_PASSWORD = `
    mutation ResetPassword(
        $password: String!, 
        $passwordConfirmation: String!, 
        $code: String!
    ) {
    resetPassword(
        password: $password, 
        passwordConfirmation: $passwordConfirmation, 
        code: $code) {
            jwt
            user {
                email
                username
            }
        }
    }
`;

export const UPDATE_USER = `
    mutation UpdateUsersPermissionsUser(
        $updateUsersPermissionsUserId: ID!, 
        $data: UsersPermissionsUserInput!
    ) {
        updateUsersPermissionsUser(id: $updateUsersPermissionsUserId, data: $data) {
            birthDate
            country
            email
            firstName
            homePhone
            lastName
            mobilePhone
            username
            address
            city
            zipCode
            discount {
                name
                value
                stripeID
            }
            used_coupons {
                code
            }
        }
    }
`;

export const CREATE_ORDER = `
    mutation CreateOrder($input: OrderInput!) {
        createOrder(data: $input) {
            updatedAt
        }
    }
`

export const GET_ORDERS_BY_JWT = `
    query GetOrdersByJWT {
        orders {
            firstName
            lastName
            address
            city
            country
            zipCode
            date
            orderID
            price
            quantity
            discount
            products {
                color {
                    name
                }
                image {
                    formats
                }
                name
                price
                documentId
            }
        }
    }
`;

export const GET_CART_BY_JWT = `
    query GetCartByJWT {
        carts {
            cart_items
            documentId
        }
    }
`;

export const UPDATE_CART = `
    mutation UpdateCart($documentId: ID!, $data: CartInput!) {
        updateCart(documentId: $documentId, data: $data) {
            cart_items
        }
    }
`;

export const GET_ALL_QUANTITY = `
    query Quantities {
        orders {
            quantity
        }
    }
`;

export const GET_PURCHASED_PRODUCTS = `
    query Products($documentIds: [ID]) {
        products(filters: { documentId: { in: $documentIds } }) {
            documentId
            image {
                formats
            }
        }
    }
`;

export const GET_HIGHLIGHTS = `
    query Highlights {
        highlights {
            title
            product {
                name
                documentId
                image {
                    formats
                }
            }
        }
    }
`

export const GET_ARTICLES = `
    query Articles {
        articles {
            excerpt
            slug
            title
            documentId
            coverImage {
                formats
            }
        }
    }
`

export const GET_ARTICLE = `
    query Article($documentId: ID!) {
        article(documentId: $documentId) {
            author
            content
            updatedAt
            excerpt
            images {
                formats
            }
            slug
            title
        }
    }
`

export const CHECK_COUPON = `
    query CheckCoupon($code: String!) {
        coupon(code: $code) {
            documentId
            code
            isActive
            value
            stripeID
        }
    }
`