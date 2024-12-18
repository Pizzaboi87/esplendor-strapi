import { GraphQLClient } from "graphql-request";
import { CHECK_COUPON, CREATE_ACCOUNT, CREATE_CART, CREATE_ORDER, FORGOT_PASSWORD, GET_ARTICLE, GET_ARTICLES, GET_CART_BY_JWT, GET_CATEGORY_CARDS, GET_FILTERS, GET_HIGHLIGHTS, GET_ORDERS_BY_JWT, GET_PRODUCT, GET_PRODUCT_CARDS, GET_PRODUCTS_SIZE, GET_PURCHASED_PRODUCTS, GET_RELATED_PRODUCTS, GET_USER_BY_JWT, RESET_PASSWORD, UPDATE_CART, UPDATE_USER, USER_LOGIN } from "./queries";
import { ArticleType, CartItem, CartObj, CategoryCard, CategoryName, ColorName, CouponType, Highlight, Order, ProductCard, ProductDetails, PurchasedItem, RegisterForm, RelatedProduct, User, UserObj } from "@/types/types";

const graphqlEndpoint = process.env.NEXT_PUBLIC_API_URL as string;

export const graphqlClient = new GraphQLClient(graphqlEndpoint, {
    headers: {

    },
});

// Fetch data from the API using GraphQL
export const gqlFetch = async <T>(query: string, variables: Record<string, any> = {}): Promise<T> => {
    return graphqlClient.request<T>(query, variables);
};

// Fetch data from the API using GraphQL with JWT
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
export const createAccount = async (formInput: RegisterForm): Promise<UserObj | string> => {
    const variables = {
        input: {
            username: formInput.userName,
            email: formInput.email,
            password: formInput.password,
        },
    };

    try {
        const result = await gqlFetch<{ register: { jwt: string; user: { username: string; email: string; id: string } } }>(
            CREATE_ACCOUNT,
            variables
        );

        if (!result || !result.register) {
            return "Invalid response from server.";
        }

        // Create new cart
        const cartResult = await createCart(result.register.jwt);

        if (typeof cartResult === "string") {
            console.error("Failed to create cart:", cartResult);
            return "Account created, but cart creation failed.";
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

// Create a cart using the API
export const createCart = async (jwt: string): Promise<Record<string, any> | string> => {
    const variables = {
        input: {
            cart_items: [],
        },
    };

    try {
        const result = await gqlAuthFetch<{ createCart: { data: Record<string, any> } }>(
            CREATE_CART,
            variables,
            jwt
        );

        if (!result || !result.createCart) {
            return "Failed to create cart.";
        }

        return result.createCart.data;
    } catch (error: any) {
        console.log("Error creating cart:", error);

        if (error.response?.errors) {
            return error.response.errors.map((err: any) => err.message).join(", ");
        }

        return "An unknown error occurred.";
    }
};

// Login using the API
export const userLogin = async (email: string, password: string): Promise<UserObj | string> => {
    const variables = {
        input: {
            identifier: email,
            password,
        },
    };

    try {
        const result = await gqlFetch<{ login: { jwt: string; user: User } }>(
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

// Reset password function
export const resetPassword = async (password: string, passwordConfirmation: string, code: string) => {
    const variables = {
        password,
        passwordConfirmation,
        code,
    }

    try {
        const result = await gqlFetch<{ resetPassword: { jwt: string; user: { email: string } } }>(RESET_PASSWORD, variables);

        if (result.resetPassword) {
            return result.resetPassword;
        }
    } catch (error: any) {
        console.log("Error resetting password:", error);
    }
}

// Update user information
export const updateUser = async (
    id: string,
    data: Record<string, any>,
    jwt: string
): Promise<Record<string, any> | string> => {
    const variables = {
        updateUsersPermissionsUserId: id,
        data,
    };

    try {
        const result = await gqlAuthFetch<{
            updateUsersPermissionsUser: { data: Record<string, any> };
        }>(UPDATE_USER, variables, jwt);

        if (!result || !result.updateUsersPermissionsUser) {
            return "Failed to update user.";
        }

        return result.updateUsersPermissionsUser.data;
    } catch (error: any) {
        console.log("Error updating user:", error);

        if (error.response?.errors) {
            return error.response.errors.map((err: any) => err.message).join(", ");
        }

        return "An unknown error occurred.";
    }
};

// Create an order and store it in the database
export const createOrder = async (
    jwt: string,
    orderData: Record<string, any>
): Promise<Record<string, any> | string> => {
    const variables = {
        input: orderData,
    };

    try {
        const result = await gqlAuthFetch<{ createOrder: { order: Record<string, any> } }>(
            CREATE_ORDER,
            variables,
            jwt
        );

        if (!result || !result.createOrder) {
            return "Failed to create order.";
        }

        return result.createOrder.order;
    } catch (error: any) {
        console.log("Error creating order:", error);

        if (error.response?.errors) {
            return error.response.errors.map((err: any) => err.message).join(", ");
        }

        return "An unknown error occurred.";
    }
};

// Fetch orders by JWT
export const fetchOrdersByJWT = async (jwt: string): Promise<Order[]> => {
    try {
        const data = await gqlAuthFetch<{ orders: Order[] }>(
            GET_ORDERS_BY_JWT,
            {},
            jwt
        );

        return data.orders;
    } catch (error) {
        console.log("Failed to fetch orders by JWT:", error);
        return [];
    }
};

// Fetch cart by JWT
export const fetchCartByJWT = async (jwt: string): Promise<CartObj> => {
    try {
        const data = await gqlAuthFetch<{ carts: Array<CartObj> }>(
            GET_CART_BY_JWT,
            {},
            jwt
        );

        return data.carts[0]
    } catch (error) {
        console.log("Failed to fetch orders by JWT:", error);
        return { documentId: "", cart_items: [] };
    }
};

// Update cart
export const updateCart = async (
    jwt: string,
    documentId: string,
    cartItems: CartItem[]
): Promise<void> => {
    const variables = {
        documentId,
        data: {
            cart_items: cartItems,
        },
    };

    try {
        await gqlAuthFetch(
            UPDATE_CART,
            variables,
            jwt
        );
    } catch (error) {
        console.error("Failed to update cart on server:", error);
        throw new Error("Could not update cart.");
    }
};

// Fetch all quantity of products from all orders
export const fetchAllQuantity = async (jwt: string) => {
    const data = await fetchOrdersByJWT(jwt);
    const quantity = data.map((order) => order.quantity).flat();
    const allQuantity = quantity.reduce((acc, curr) => {
        for (const key in curr) {
            if (acc[key]) {
                acc[key] += curr[key];
            } else {
                acc[key] = curr[key];
            }
        }
        return acc;
    }, {} as Record<string, number>);

    return allQuantity;
}

// Fetch all purchased products by id-s
export const fetchPurchasedProducts = async (documentIds: string[]) => {
    const data = await gqlFetch<{ products: Array<PurchasedItem> }>(
        GET_PURCHASED_PRODUCTS,
        { documentIds }
    );

    return data.products;
}

// Fetch highlighted products
export const fetchHighlightedProducts = async () => {
    const data = await gqlFetch<{ highlights: Array<Highlight> }>(GET_HIGHLIGHTS, { start: 0 });
    return data.highlights;
}

// Fetch all articles
export const fetchArticles = async () => {
    const data = await gqlFetch<{ articles: Array<ArticleType> }>(GET_ARTICLES);
    return data.articles;
}

// Fetch an article by id
export const fetchArticle = async (documentId: string) => {
    const data = await gqlFetch<{ article: ArticleType }>(GET_ARTICLE, { documentId });
    return data.article;
}

// Check if coupon is valid
export const checkCoupon = async (couponCode: string, jwt: string) => {
    try {
        const data = await gqlAuthFetch<{ coupon: CouponType }>(
            CHECK_COUPON,
            { code: couponCode.toUpperCase() },
            jwt
        );

        return data.coupon;
    } catch (error) {
        console.log("Error checking coupon:", error);
        return "Invalid coupon";
    }
}