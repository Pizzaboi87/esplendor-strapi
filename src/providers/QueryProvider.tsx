"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PropsWithChildren, useMemo } from "react";

export const QueryProvider = ({ children }: PropsWithChildren) => {
  const client = useMemo(() => new QueryClient(), []);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
