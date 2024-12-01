### Esplend'or Rings

[Esplend'or Rings](https://esplendor-rings.vercel.app) is a premium webshop specializing in engagement and wedding rings. It delivers an elegant shopping experience with modern features and responsive design.

#### Features

- **Wishlist**: Save favorite products for quick access.
- **Cart Synchronization**:
  - Registered users: cart content is stored on the server.
  - Guest users: cart is managed via localStorage.
- **Exclusive Articles**: Registered users can access premium articles.
- **Featured Offers**: Highlighted promotions and exclusive deals.
- **Membership Program**: Special benefits for loyal customers.
- **Coupons**: Support for discounts and promotions.
- **Stripe Payment Integration**: Secure and fast online payments.
- **Advanced Filters**:
  - Filter by categories, colors, and stock availability.
- **Order History**: View past orders in the user dashboard.

#### Tech Stack

##### Frontend

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Handling**: GraphQL
- **Libraries**:
  - React Query
  - Stripe.js
  - React Hook Form
  - SweetAlert2
  - EmailJS
  - React Date Picker
  - React Phone Input 2
  - React Select
  - Embla Carousel

##### Backend

- **CMS**: [Strapi](https://strapi.io/) with TypeScript
- **Database**: PostgreSQL [Aiven](https://aiven.io/)
- **Media Storage**: [Cloudinary](https://cloudinary.com/)
- **Custom Implementations**:
  - Privacy Handlers: Users can only view and edit their own data, with field-level restrictions.
  - Custom Controllers: Built to extend Strapi’s default functionalities.

#### Usage of the project

##### Frontend

The frontend source code is located in this repository. It can be managed with the following scripts:

###### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Pizzaboi87/esplendor-strapi.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

- **Development**: Start the development server:

  ```bash
  npm run dev
  ```

- **Production**: Build and start the production server:

  ```bash
  npm run build
  npm start
  ```

##### Backend Code

The backend source code can be found here: [Esplend'or Strapi Backend](https://github.com/Pizzaboi87/esplendor-strapi-backend).

#### Contribution

Feel free to contribute to this project by submitting pull requests or opening issues for bug fixes or feature requests. Your contributions are highly appreciated!
