import { CartProvider } from "./Cart";
import { FilterProvider } from "./Filters";
import { QueryProvider } from "./QueryProvider";
import { RankProvider } from "./Rank";
import { UserProvider } from "./User";

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <QueryProvider>
      <UserProvider>
        <FilterProvider>
          <RankProvider>
            <CartProvider>{children}</CartProvider>
          </RankProvider>
        </FilterProvider>
      </UserProvider>
    </QueryProvider>
  );
};
