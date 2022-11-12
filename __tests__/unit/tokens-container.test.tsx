import { render, waitFor } from "@testing-library/react";

import { TokensContainer } from "@components/layout";
import { useGetAllTokens, useGetAllTokensMetadata } from "@api/hooks";
import { TokenItem, TokenMetadata } from "@utils/types";

jest.mock("./../../api/hooks/token.ts");

const mockedUseGetAllTokens = useGetAllTokens as jest.Mock<any>;
const mockedUseGetAllTokensMetadata = useGetAllTokensMetadata as jest.Mock<any>;

const mockTokens: TokenItem[] = [
  {
    id: 101,
    nft_contract_address: "token_1_address",
    nft_token_id: 201,
    metadata_uri: "301",
    creator_address: "token_1_creator_address",
    royalty_receiver_address: "token_1_receiver_address",
    royalty_bips: 123456,
    created_at: "2022-11-12T12:12:26+00:00",
  },
  {
    id: 102,
    nft_contract_address: "token_2_address",
    nft_token_id: 202,
    metadata_uri: "302",
    creator_address: "token_2_creator_address",
    royalty_receiver_address: "token_2_royalty_receiver_address",
    royalty_bips: 123456,
    created_at: "2022-11-12T12:21:18+00:00",
  },
];

const mockTokensMetadata: TokenMetadata[] = [
  {
    id: 301,
    nft_contract_address: "token_1_address",
    nft_token_id: 101,
    name: "Mock token 1",
    image_url:
      "https://images.unsplash.com/photo-1668194645738-ef8dbb426086?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    description:
      "Cras. Nostra hymenaeos habitasse augue adipiscing. Penatibus vel egestas lobortis fringilla et. Orci suspendisse Curabitur etiam quisque condimentum risus ornare mattis tortor odio varius cum massa euismod placerat justo leo.",
    properties: {
      mana: 35,
      power: 100,
      health: 500,
    },
  },
  {
    id: 302,
    nft_contract_address: "address",
    nft_token_id: 102,
    name: "Token 2",
    image_url:
      "https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description: "my new token. Buy pls and we will be rich.... (nope)",
    properties: {
      mana: 100,
      power: 90,
      health: 600,
    },
  },
];

describe("Tokens Container", () => {
  beforeEach(() => {
    mockedUseGetAllTokens.mockImplementation(() => ({
      data: null,
      error: null,
      isLoading: true,
      isFetched: false,
    }));

    mockedUseGetAllTokensMetadata.mockImplementation(() => ({
      data: null,
      error: null,
      isLoading: true,
      isFetched: false,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Renders without crashing", () => {
    render(<TokensContainer />);
  });

  it("Initially renders with loader", () => {
    const { getByText } = render(<TokensContainer />);

    expect(getByText(/Loading.../i)).toBeDefined();
  });

  it("shows empty placeholder with empty array of tokens", () => {
    mockedUseGetAllTokens.mockImplementation(() => ({
      data: {
        data: [],
      },
      error: null,
      isLoading: false,
      isFetched: true,
    }));

    const { getByText } = render(<TokensContainer />);

    expect(getByText(/No tokens to show.../)).toBeDefined();
  });

  it("displays the fetched items", () => {
    mockedUseGetAllTokens.mockImplementation(() => ({
      data: {
        data: mockTokens,
      },
      error: null,
      isLoading: false,
      isFetched: true,
    }));

    mockedUseGetAllTokensMetadata.mockImplementation(() => ({
      data: {
        data: mockTokensMetadata,
      },
      error: null,
      isLoading: true,
      isFetched: false,
    }));

    const { getAllByRole } = render(<TokensContainer />);

    waitFor(() => {
      expect(getAllByRole("article")).toBeDefined();
      expect(getAllByRole("article").length).toEqual(mockTokensMetadata.length);
    });
  });
});
