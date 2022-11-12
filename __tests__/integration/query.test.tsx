import { FC, PropsWithChildren } from "react";
import { useQuery } from "react-query";
import { waitFor, renderHook } from "@testing-library/react";

import { QueryProvider } from "@components/layout";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <QueryProvider>{children}</QueryProvider>
);

describe("React Query", () => {
  const useCustomQuery = () => useQuery(["mock"], () => "Hello");

  it("query launches successfully", async () => {
    const { result } = renderHook(() => useCustomQuery(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual("Hello");
    });
  });
});
