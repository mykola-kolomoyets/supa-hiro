import { FC, PropsWithChildren } from "react";
import { waitFor, renderHook, cleanup } from "@testing-library/react";

import { useGetAllTokens, useGetAllTokensMetadata } from "@api/hooks";

import { QueryProvider } from "@components/layout";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <QueryProvider>{children}</QueryProvider>
);

describe("Tokens Service Queries", () => {
  beforeEach(() => {
    cleanup();
  });

  it("useGetAllTokens get first page", async () => {
    const { result } = renderHook(() => useGetAllTokens(1, 10), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);

      expect(result.current.data?.data).toBeDefined();

      expect(result.current.data?.data?.length).toBeGreaterThanOrEqual(0);
      expect(result.current.data?.data?.length).toBeLessThanOrEqual(10);
    });
  });

  it("useGetAllTokensMetadata get first page", async () => {
    const { result } = renderHook(() => useGetAllTokensMetadata(1, 10), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);

      expect(result.current.data?.data).toBeDefined();

      expect(result.current.data?.data?.length).toBeGreaterThanOrEqual(0);
      expect(result.current.data?.data?.length).toBeLessThanOrEqual(10);
    });
  });
});
