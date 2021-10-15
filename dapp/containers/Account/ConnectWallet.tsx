import { useCallback, useEffect, useMemo, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import { AbstractConnector } from '@web3-react/abstract-connector';
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector';

import { injected, walletconnect } from "../../connectors";
import useENSName from "../../hooks/useENSName";

import Button from '../../components/Button';
import InjectedButton from './components/InjectedButton';

import { formatEtherscanLink, shortenHex } from "../../util";

type Props = {
  triedToEagerConnect: boolean;
};

enum ConnectorNames {
  Injected = 'Injected', 
  WalletConnect = 'WalletConnect',
}

const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect, 
}

const ConnectWallet = ({ triedToEagerConnect }: Props) => {
  const { active, error, activate, chainId, account, setError } =
    useWeb3React();

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  
  const connectorNameKeys = useMemo(() => {
    return Object.keys(connectorsByName)
  }, []);

  const handleActivateMethodClick = useCallback((connector: AbstractConnector) => {
    if (connecting) {
      return false;
    }

    setConnecting(true);
    activate(connector, undefined, true).catch((error) => {
      // ignore the error if it's a user rejected request     
      if (
          error instanceof UserRejectedRequestError 
          || error instanceof UserRejectedRequestErrorWalletConnect
        ) {
        setConnecting(false);
      } else {
        setError(error);
      }
    });
  }, [connecting]);

  useEffect(() => {
    if (active || error) {
      setConnecting(false);      
    }
  }, [active, error]);

  const ENSName = useENSName(account);
  
  if (error) {
    return null;
  }

  if (!triedToEagerConnect) {
    return null;
  }

  if (typeof account !== "string") {
    return (
      <div>
        <h2>Connect your Wallet:</h2>
        {connectorNameKeys.map((name, idx) => {
          const currentConnector = connectorsByName[name]; 
          return (
            <div key={name}>
              {name === 'Injected' ? (
                <p>
                  <InjectedButton 
                    stopOnboardMetaMask={Boolean(active || error)}                                           
                    disabled={connecting}
                    onClick={() => {
                      handleActivateMethodClick(currentConnector)                      
                    }}
                  />
                </p>
              ) : ( 
                <p>
                  <Button                                          
                    disabled={connecting}
                    onClick={() => {
                      handleActivateMethodClick(currentConnector)                    
                    }}
                  >              
                    {name}
                  </Button>
              </p>
              )}
              

              {Boolean(idx < (connectorNameKeys.length - 1)) && (
                <p>Or</p>
              )}
            </div>
          )
        })}       
      </div>
    );
  }


  return (
    <a
      {...{
        href: formatEtherscanLink("Account", [chainId, account]),
        target: "_blank",
        rel: "noopener noreferrer",
      }}
    >
      {ENSName || `${shortenHex(account, 4)}`}
    </a>
  );
};

export default ConnectWallet;
