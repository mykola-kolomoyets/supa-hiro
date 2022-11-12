import { TokenItem } from "@utils/types";
import { useQuery } from "react-query";
import { getAllTokens, getAllTokensMetadata } from "./../services/token";

export const useGetAllTokens = (page: number, limit: number = 10) =>
  useQuery(["tokens/all", page, limit], () => getAllTokens(page, limit));

export const useGetAllTokensMetadata = (page: number, limit: number = 10) =>
  useQuery(["tokens/metadata", page, limit], () =>
    getAllTokensMetadata(page, limit)
  );
