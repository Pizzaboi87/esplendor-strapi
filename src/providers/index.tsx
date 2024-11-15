import { FilterProvider } from "./Filters";
import { QueryProvider } from "./QueryProvider";

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <QueryProvider>
      <FilterProvider>{children}</FilterProvider>
    </QueryProvider>
  );
};
