import { useHiroWallet, useHydrated } from "@utils/hooks";
import { useMemo } from "react";
import { Button } from "../button";

export const HiroConnectWalletButton = () => {
  const isHydrated = useHydrated();

  const { connect, disconnect, isConnected } = useHiroWallet();

  const isWalletConnected = useMemo(
    () => isHydrated && isConnected,
    [isHydrated, isConnected]
  );

  const buttonText = useMemo(
    () => (isWalletConnected ? "Disconnect Wallet" : "Connect Wallet"),
    [isWalletConnected]
  );

  const onClick = useMemo(
    () => (isWalletConnected ? disconnect : connect),
    [isWalletConnected, disconnect, connect]
  );

  return <Button onClick={onClick}>{buttonText}</Button>;
};
