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
    tabIndex: 0,
    icon: "/assets/icons/user-details.svg",
  },
  {
    title: "Previous Orders",
    tabIndex: 1,
    icon: "/assets/icons/orders.svg",
  },
  {
    title: "Ordered Items",
    tabIndex: 2,
    icon: "/assets/icons/items.svg",
  },
  {
    title: "Wishlist",
    tabIndex: 3,
    icon: "/assets/icons/wishlist.svg",
  },
];

export const inclusions = [
  {
    title: "Free Shipping",
    description: "Free shipping for every order",
    icon: "/assets/icons/shipping.svg",
  },
  {
    title: "Money Guarantee",
    description: "Within 30 days for an exchange",
    icon: "/assets/icons/money.svg",
  },
  {
    title: "Online Support",
    description: "24 hours a day, 7 days a week",
    icon: "/assets/icons/support.svg",
  },
  {
    title: "Flexible Payment",
    description: "Pay with multiple credit cards",
    icon: "/assets/icons/payment.svg",
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
