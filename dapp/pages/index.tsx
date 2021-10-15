import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import { useCallback, useMemo, useState } from "react";
import Button from "../components/Button";
import { ConnectWallet, ETHBalance } from "../containers/Account";
import { usePegaxyContext } from "../containers/Account/Pegaxy";
import fakeResponse from "../helpers/fakeResponse";
import useEagerConnect from "../hooks/useEagerConnect";

function Home() {
  
  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const { signin } = usePegaxyContext();

  const isConnected = useMemo(() => {
    return typeof account === "string" && !!library
  }, [account, library]);

  const [isLogging, setIsLogging] = useState(false);
  const [responseSignIn, setResponseSignIn] = useState(null);

  const handleSignInClick = useCallback(async () => {
    if (isLogging) {
      return false;
    }
    try {
      setIsLogging(true);
      const response = await signin();
      setResponseSignIn(response);
    } catch (err) {}
    setIsLogging(false);
  }, [isLogging]);

  return (
    <div>
      <Head>
        <title>DApp Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
         My DApp
        </h1>
        <ConnectWallet triedToEagerConnect={triedToEagerConnect} />
        {isConnected && (
          <section>
            <ETHBalance />
            <Button onClick={handleSignInClick}>Sign in</Button>
            {responseSignIn && (<p>Tada: {responseSignIn.message}</p>)}
          </section>
        )}
      </main>

      <style jsx>{`   
        main {
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Home;
