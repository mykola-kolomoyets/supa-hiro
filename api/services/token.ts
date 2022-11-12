import { supabase } from "@supabase-api";
import { TokenItem, TokenMetadata } from "@utils/types/token";

import { DB_NAMES } from "../config";

import { all } from "../selectors";

export const getAllTokens = async (page: number, limit: number) =>
  await supabase
    .from(DB_NAMES.TOKEN)
    .select<string, TokenItem>(all())
    .range(page - 1, limit);

export const getAllTokensMetadata = async (page: number, limit: number) =>
  await supabase
    .from(DB_NAMES.TOKEN_METADATA)
    .select<string, TokenMetadata>(all())
    .range(page - 1, limit);
