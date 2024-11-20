import { GraphQLClient } from "graphql-request";
import { CREATE_ACCOUNT, FORGOT_PASSWORD, GET_CATEGORY_CARDS, GET_FILTERS, GET_PRODUCT, GET_PRODUCT_CARDS, GET_PRODUCTS_SIZE, GET_RELATED_PRODUCTS, GET_USER_BY_JWT, USER_LOGIN } from "./queries";
import { CategoryCard, CategoryName, ColorName, ProductCard, ProductDetails, RegisterForm, RelatedProduct, User } from "@/types/types";

const graphqlEndpoint = process.env.NEXT_PUBLIC_API_URL as string;

export const graphqlClient = new GraphQLClient(graphqlEndpoint, {
    headers: {

    },
});

// Fetch data from the API using GraphQL
export const gqlFetch = async <T>(query: string, variables: Record<string, any> = {}): Promise<T> => {
    return graphqlClient.request<T>(query, variables);
};

export const gqlAuthFetch = async <T>(
    query: string,
    variables: Record<string, any> = {},
    jwt?: string
): Promise<T> => {
    if (jwt) {
        graphqlClient.setHeaders({
            Authorization: `Bearer ${jwt}`,
        });
    }

    return graphqlClient.request<T>(query, variables);
};


// Fetch category cards from the API
export const fetchCategoryCards = async () => {
    const data = await gqlFetch<{ categories: Array<CategoryCard> }>(GET_CATEGORY_CARDS);
    return data.categories
};

// Fetch filters from the API
export const fetchFilters = async () => {
    const data = await gqlFetch<{ categories: Array<CategoryName>, colors: Array<ColorName> }>(GET_FILTERS);
    return {
        categories: data.categories,
        colors: data.colors,
    }
}

// Fetch products from the API
export const fetchProductCards = async (
    categoryFilters: string[],
    colorFilters: string[],
    start: number,
    price: string,
    updatedAt: string,
    stockStatus: string
): Promise<ProductCard[]> => {
    const variables = {
        categoryFilters: categoryFilters.length > 0 ? categoryFilters : undefined,
        colorFilters: colorFilters.length > 0 ? colorFilters : undefined,
        start,
        price: price ? price : undefined,
        updatedAt: updatedAt ? updatedAt : undefined,
        stockStatus: stockStatus === "inStock" ? true : undefined
    };

    const data = await gqlFetch<{ products: ProductCard[] }>(GET_PRODUCT_CARDS, variables);
    return data.products;
};

// Fetch the number of products from the API (meta data is not available in the response)
export const fetchProductsSize = async (
    categoryFilters: string[],
    colorFilters: string[],
    stockStatus: string
): Promise<number> => {
    const variables = {
        categoryFilters: categoryFilters.length > 0 ? categoryFilters : undefined,
        colorFilters: colorFilters.length > 0 ? colorFilters : undefined,
        stockStatus: stockStatus === "inStock" ? true : undefined
    };

    const data = await gqlFetch<{ products: Array<{ isInStock: boolean }> }>(
        GET_PRODUCTS_SIZE,
        variables
    );

    return data.products.length;
};

// Fetch a single product from the API
export const fetchProduct = async (documentId: string) => {
    const data = await gqlFetch<{ product: ProductDetails }>(GET_PRODUCT, { documentId });
    return data.product
};

// Fetch related products from the API
export const fetchRelatedProducts = async (documentId: string) => {
    const data = await gqlFetch<{ product: { related_products: Array<RelatedProduct> } }>(GET_RELATED_PRODUCTS, { documentId });
    return data.product.related_products
}

// Fetch products with filters and size
export const getProductsWithSize = (
    categoryFilters: string[],
    colorFilters: string[],
    start: number,
    price: string,
    updatedAt: string,
    stockStatus: string
) => {
    return [
        {
            queryKey: ["productsSize", { categoryFilters, colorFilters, stockStatus }],
            queryFn: () => fetchProductsSize(categoryFilters, colorFilters, stockStatus),
        },
        {
            queryKey: ["products", { categoryFilters, colorFilters, start, price, updatedAt, stockStatus }],
            queryFn: () => fetchProductCards(categoryFilters, colorFilters, start, price, updatedAt, stockStatus),
        },
    ];
};

// Create an account using the API
export const createAccount = async (formInput: RegisterForm): Promise<User | string> => {
    const variables = {
        input: {
            username: formInput.fullName,
            email: formInput.email,
            password: formInput.password,
        },
    };

    try {
        const result = await gqlFetch<{ register: { jwt: string; user: { username: string; email: string } } }>(
            CREATE_ACCOUNT,
            variables
        );

        if (!result || !result.register) {
            return "Invalid response from server.";
        }

        return result.register;
    } catch (error: any) {
        console.log("Error creating account:", error);

        if (error.response?.errors) {
            return error.response.errors.map((err: any) => err.message).join(", ");
        }

        return "An unknown error occurred.";
    }
};

// Login using the API
export const userLogin = async (email: string, password: string): Promise<User | string> => {
    const variables = {
        input: {
            identifier: email,
            password,
        },
    };

    try {
        const result = await gqlFetch<{ login: { jwt: string; user: { username: string; email: string } } }>(
            USER_LOGIN,
            variables
        );

        if (!result || !result.login) {
            return "Invalid response from server.";
        }

        return result.login;
    } catch (error: any) {
        console.log("Error during login:", error);

        if (error.response?.errors) {
            return error.response.errors.map((err: any) => err.message).join(", ");
        }

        return "An unknown error occurred.";
    }
};

// Fetch user data by JWT
export const fetchUserByJWT = async (jwt: string): Promise<User | null> => {
    try {
        const data = await gqlAuthFetch<{ me: User }>(GET_USER_BY_JWT, {}, jwt);
        return data.me;
    } catch (error) {
        console.log("Failed to fetch user by JWT:", error);
        return null;
    }
};

// Forgot password function
export const sendForgotPasswordEmail = async (email: string) => {
    const variables = {
        email: email,
    }

    try {
        const result = await gqlFetch<{ forgotPassword: boolean }>(FORGOT_PASSWORD, variables);

        if (result.forgotPassword) {
            return true;
        }
    } catch (error: any) {
        console.log("Error sending forgot password email:", error);
    }
}