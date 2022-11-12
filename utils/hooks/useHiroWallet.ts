import React, { useCallback, useMemo, useState } from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";

export const useHiroWallet = () => {
  const [, setState] = useState(0);

  const appConfig = useMemo(
    () => new AppConfig(["store_write", "publish_data"]),
    []
  );

  const userSession = useMemo(
    () => new UserSession({ appConfig }),
    [appConfig]
  );

  const connect = () => {
    showConnect({
      appDetails: {
        name: "Supa-Hiro",
        icon: window.location.origin + "/logo512.png",
      },
      redirectTo: "/",
      onFinish: () => {
        window.location.reload();
      },
      userSession,
    });
  };

  const disconnect = () => {
    userSession.signUserOut("/");
  };

  const isConnected = useMemo(
    () => userSession.isUserSignedIn(),
    [userSession]
  );

  const getUserProfile = useCallback(() => {
    return isConnected ? userSession.loadUserData().profile : null;
  }, [isConnected, userSession]);

  const getUserData = useCallback(() => {
    return isConnected
      ? [
          getUserProfile().stxAddress.mainnet as string,
          getUserProfile().stxAddress.testnet as string,
        ]
      : null;
  }, [isConnected, getUserProfile]);

  return {
    userSession,
    connect,
    disconnect,
    isConnected,
    getUserProfile,
    getUserData,
  };
};
