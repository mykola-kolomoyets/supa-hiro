import { FC, PropsWithChildren } from "react";
import { QueryClientProvider } from "react-query";

import { useQueryClient } from "@utils/hooks";

export const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = useQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
