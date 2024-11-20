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

export type CategoryCard = {
    name: string;
    documentId: string;
    icon: Media
}

export type ProductCard = {
    name: string;
    documentId: string;
    price: number;
    slug: string;
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
    jwt: string;
    user: {
        username: string;
        email: string;
    }
}

export type RegisterForm = {
    userName: string;
    email: string;
    password: string;
    passwordRepeat: string;
}