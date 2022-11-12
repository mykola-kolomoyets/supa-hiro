import { FC } from "react";
import Image from "next/image";

import { ComplexTokenItem } from "@utils/types";
import { formatDate } from "@utils/functions";

import styles from "./token-card.module.scss";

export const TokenCard: FC<ComplexTokenItem> = ({
  id,
  nft_contract_address,
  nft_token_id,
  creator_address,
  royalty_receiver_address,
  royalty_bips,
  created_at,
  name,
  image_url,
  description,
  properties,
}) => {
  return (
    <article className={styles["token-card"]}>
      <Image
        // objectFit prop is deprecated,
        // so using style as written in documentation
        //https://nextjs.org/docs/api-reference/next/image
        className={styles["token-card__image"]}
        style={{ objectFit: "cover" }}
        src={image_url}
        width={400}
        alt={name}
        height={180}
      />

      <div className={styles["token-card__info"]}>
        <h3 className={styles["token-card__info--title"]}>{name}</h3>

        <p className={styles["token-card__info--description"]}>{description}</p>

        <div>
          <i>{formatDate(created_at)}</i>
        </div>
      </div>
    </article>
  );
};
