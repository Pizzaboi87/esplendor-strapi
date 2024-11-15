export type CategoryName = {
    name: string;
}

export type Media = {
    formats: {
        [key: string]: {
            url: string;
        }
    }
}

export type Category = {
    createdAt: string;
    documentId: number
    name: string;
    publishedAt: string;
    updatedAt: string;
    icon: Media;
}

export type Product = {
    createdAt: string;
    description: string;
    documentId: string;
    isInStock: boolean;
    name: string;
    price: number;
    publishedAt: string;
    slug: string;
    updatedAt: string;
    image: Media
}