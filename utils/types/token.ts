interface TokenBase {
  id: number;
  nft_contract_address: string;
  nft_token_id: number;
}

export interface TokenProperties {
  power: number;
  health: number;
  mana: number;
}

export interface TokenItem extends TokenBase {
  metadata_uri: string;
  creator_address: string;
  royalty_receiver_address: string;
  royalty_bips: number;
  created_at: Date | string;
}

export interface TokenMetadata extends TokenBase {
  name: string;
  image_url: string;
  description: string;
  properties: TokenProperties;
}

export interface ComplexTokenItem extends TokenItem, TokenMetadata {}
