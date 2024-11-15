import axios from "axios";

// Create an axios instance
const apiClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}` as string,
})

// Define the API endpoints
export const API_ENDPOINTS = {
    GET_CATEGORIES: "/categories?populate=*",
    GET_CATEGORY_NAMES: "/categories?select=name",
    GET_PRODUCTS: "/products",
} as const;

type ApiEndpointKeys = keyof typeof API_ENDPOINTS;

// Fetch data from the API
export const fetchFromApi = async (endpoint: typeof API_ENDPOINTS[ApiEndpointKeys]) => {
    const response = await apiClient.get(endpoint);

    if (!response.data || !response.data.data) {
        throw new Error("Invalid API response structure");
    }

    return response.data.data;
};

// Fetch products from the API with category filters
export const fetchProducts = async (
    endpoint: typeof API_ENDPOINTS[ApiEndpointKeys],
    categoryFilters: string[]
) => {
    // If there are no filters, fetch all products
    if (categoryFilters.length === 0) {
        const response = await apiClient.get(endpoint, {
            params: {
                populate: ["image"],
            },
        });

        if (!response.data || !response.data.data) {
            throw new Error("Invalid API response structure");
        }

        return response.data.data;
    }

    // If there are filters, fetch products based on the filters
    const queryString = categoryFilters
        .map((category) => `filters[categories][name][$in]=${encodeURIComponent(category)}`)
        .join("&");

    const response = await apiClient.get(`${endpoint}?${queryString}`, {
        params: {
            populate: ["image"],
        },
    });

    if (!response.data || !response.data.data) {
        throw new Error("Invalid API response structure");
    }

    return response.data.data;
};

