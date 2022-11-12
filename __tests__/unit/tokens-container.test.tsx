import { render, waitFor } from "@testing-library/react";

import { TokensContainer } from "@components/layout";
import { useGetAllTokens, useGetAllTokensMetadata } from "@api/hooks";
import { TokenItem } from "@utils/types";

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

    const { getAllByRole } = render(<TokensContainer />);

    waitFor(() => {
      expect(getAllByRole("article")).toBeDefined();
      expect(getAllByRole("article").length).toEqual(2);
    });
  });
});
