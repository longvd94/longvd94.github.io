import React, { useEffect } from 'react';
import useMetaMaskOnboarding from "../../../hooks/useMetaMaskOnboarding";
import Button from '../../../components/Button';


const InjectedButton = ({ stopOnboardMetaMask, ...props }) => {
     const {
        isMetaMaskInstalled,
        isWeb3Available,
        startOnboarding,
        stopOnboarding,
    } = useMetaMaskOnboarding();

    useEffect(() => {
        if (stopOnboardMetaMask) {
            stopOnboarding();
        }
    }, [stopOnboardMetaMask]);

    if (isWeb3Available) {
        return (
            <Button {...props}>
                {isMetaMaskInstalled ? "Connect to MetaMask" : "Connect to Wallet"}
            </Button>
        );
    }

    return (
        <Button {...props} onClick={startOnboarding}>
            Install Metamask
        </Button>
    );
  
}

export default InjectedButton;