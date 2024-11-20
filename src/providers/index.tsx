import { CartProvider } from "./Cart";
import { FilterProvider } from "./Filters";
import { QueryProvider } from "./QueryProvider";
import { UserProvider } from "./User";

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <QueryProvider>
      <UserProvider>
        <FilterProvider>
          <CartProvider>{children}</CartProvider>
        </FilterProvider>
      </UserProvider>
    </QueryProvider>
  );
};
