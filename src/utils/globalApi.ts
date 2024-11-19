import { GraphQLClient } from "graphql-request";
import { GET_CATEGORY_CARDS, GET_FILTERS, GET_PRODUCT, GET_PRODUCT_CARDS, GET_PRODUCTS_SIZE, GET_RELATED_PRODUCTS } from "./queries";
import { CategoryCard, CategoryName, ColorName, ProductCard, ProductDetails, RelatedProduct } from "@/types/types";

const graphqlEndpoint = process.env.NEXT_PUBLIC_API_URL as string;

export const graphqlClient = new GraphQLClient(graphqlEndpoint, {
    headers: {
        // Auth token can be added here
    },
});

// Fetch data from the API using GraphQL
export const gqlFetch = async <T>(query: string, variables: Record<string, any> = {}): Promise<T> => {
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
