import { FC, useMemo, useState } from "react";

import { useGetAllTokens, useGetAllTokensMetadata } from "@api/hooks";

import { pageLimit } from "@utils/constants";
import { or } from "@utils/functions";
import { ComplexTokenItem } from "@utils/types";

import { TokenCard } from "@components/ui";

import styles from "./tokens-container.module.scss";

export const TokensContainer: FC = () => {
  const [page, setPage] = useState(1);

  const {
    data: tokensResponse,
    error: tokenItemsError,
    isLoading: isTokenItemsLoading,
    isFetched: isTokenItemsFetched,
  } = useGetAllTokens(page, pageLimit);

  const {
    data: tokensMetadataResponse,
    error: tokensMetadataError,
    isLoading: isTokensMetadataLoading,
    isFetched: isTokensMetadataFetched,
  } = useGetAllTokensMetadata(page, pageLimit);

  const tokens = useMemo(() => tokensResponse?.data || [], [tokensResponse]);

  const complexTokens = useMemo(() => {
    if (!tokensMetadataResponse?.data?.length) return [];

    const result: ComplexTokenItem[] = [];

    tokens.forEach((token) => {
      const tokenMetadata = tokensMetadataResponse.data.find(
        (item) => item.nft_token_id === token.id
      )!;

      const complexTokenItem: ComplexTokenItem = {
        ...token,
        ...tokenMetadata,
      };

      result.push(complexTokenItem);
    });

    return result;
  }, [tokens, tokensMetadataResponse]);

  if (
    !tokensResponse &&
    or(
      isTokenItemsLoading,
      !isTokenItemsFetched,
      isTokensMetadataLoading,
      !isTokensMetadataFetched
    )
  )
    return <h3>Loading...</h3>;

  return (
    <div className={styles["tokens-container"]}>
      {complexTokens?.length ? (
        complexTokens?.map((token) => <TokenCard key={token.id} {...token} />)
      ) : (
        <h3>No tokens to show...</h3>
      )}
    </div>
  );
};
