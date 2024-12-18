import { User } from "@/types/types";

export const noHeaderFooterUrls = [
  "/sign-up",
  "/sign-in",
  "/recover-password",
  "/password-reset",
];

export const headerNavItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Shop",
    url: "/shop",
  },
];

export const footerNavItems = [
  {
    title: "Facebook",
    url: "https://www.facebook.com",
    icon: "/assets/icons/facebook.svg",
  },
  {
    title: "Instagram",
    url: "https://www.instagram.com",
    icon: "/assets/icons/instagram.svg",
  },
  {
    title: "YouTube",
    url: "https://www.youtube.com",
    icon: "/assets/icons/youtube.svg",
  },
];

export const accountNavItems = [
  {
    title: "Personal Details",
    url: "/account/personal",
    icon: "/assets/icons/user-details.svg",
  },
  {
    title: "Previous Orders",
    url: "/account/orders",
    icon: "/assets/icons/orders.svg",
  },
  {
    title: "Golden Loyalty",
    url: "/account/loyalty",
    icon: "/assets/icons/items.svg",
  },
  {
    title: "Wishlist",
    url: "/account/wishlist",
    icon: "/assets/icons/wishlist.svg",
  },
];

export const upperFooterIcons = [
  {
    title: "Free Shipping",
    description: "Free shipping for every order",
    icon: "/assets/icons/gift.svg",
  },
  {
    title: "Secure Payment",
    description: "Trusted payment gateway",
    icon: "/assets/icons/shield.svg",
  },
  {
    title: "Online Support",
    description: "24 hours a day, 7 days a week",
    icon: "/assets/icons/chat.svg",
  },
  {
    title: "High Quality",
    description: "Only the best quality materials",
    icon: "/assets/icons/gem-fill.svg",
  },
];

export const categories = [
  {
    title: "Diamond Rings",
    image: "/assets/categories/diamond.webp",
  },
  {
    title: "Engagement Rings",
    image: "/assets/categories/engagement.webp",
  },
  {
    title: "Rings for Men",
    image: "/assets/categories/men.webp",
  },
  {
    title: "Signet Rings",
    image: "/assets/categories/signet.webp",
  },
  {
    title: "Gemstone Rings",
    image: "/assets/categories/stone.webp",
  },
  {
    title: "Wedding Rings",
    image: "/assets/categories/wedding.webp",
  },
];

export const years = Array.from(
  { length: 100 },
  (_, i) => new Date().getFullYear() - i
);

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const addressFields: (keyof User)[] = [
  "firstName",
  "lastName",
  "country",
  "city",
  "address",
  "zipCode",
];
