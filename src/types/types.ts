export type CategoryName = {
    name: string;
}

export type ColorName = {
    name: string;
}

export type Media = {
    name: string;
    documentId: string;
    formats: {
        [key: string]: {
            url: string;
        }
    }
}

export type PurchasedItem = {
    documentId: string;
    image: {
        formats: {
            [key: string]: {
                url: string;
            }
        }
    }
}

export type CategoryCard = {
    name: string;
    documentId: string;
    icon: Media
}

export type ProductCard = {
    name: string;
    documentId: string;
    price: number;
    updatedAt: string;
    isInStock: boolean;
    image: Media
}

export type ProductDetails = {
    name: string;
    documentId: string;
    description: string;
    price: number;
    isInStock: boolean;
    updatedAt: string;
    color: ColorName;
    categories: CategoryName[];
    image: Media
}

export type RelatedProduct = {
    name: string;
    documentId: string;
    price: number;
    image: Media
}

export type User = {
    id: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    mobilePhone?: string;
    homePhone?: string;
    birthDate?: string;
    country?: string;
    address?: string;
    city?: string;
    zipCode?: string;
    discount?: {
        name: string;
        value: number;
        stripeID: string;
    }
    used_coupons?: {
        code: string;
    }[] | [];
    wishlist?: ProductCard[] | [];
}

export type UserObj = {
    jwt: string;
    user: User;
}

export type RegisterForm = {
    userName: string;
    email: string;
    password: string;
    passwordRepeat: string;
}

export type Product = {
    documentId: string;
    name: string;
    price: number;
    color: { name: string };
    image: { formats: { thumbnail: { url: string } } };
}

export type Order = {
    orderID: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
    date: string;
    price: number;
    discount: number;
    products: Product[];
    quantity: { [key: string]: number }[];
}

export type Rank = "rose" | "yellow" | "white" | "newby"

export type Highlight = {
    title: string;
    product: {
        name: string;
        documentId: string;
        image: {
            formats: {
                [key: string]: {
                    url: string;
                }
            }
        }
    }
}

export type ArticleType = {
    title: string;
    author: string;
    updatedAt: string;
    content: any[];
    excerpt: string;
    images: {
        formats: {
            medium: {
                url: string
            }
        }
    }[];
    documentId?: string;
    coverImage?: {
        formats: {
            [key: string]: {
                url: string
            }
        }
    };
}

export type FormValues = {
    name: string;
    email: string;
    message: string;
};

export type CouponType = {
    documentId: string;
    code: string;
    isActive: boolean;
    stripeID: string;
    value: number;
}

export type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export type CartObj = {
    documentId: string;
    cart_items: CartItem[]
}