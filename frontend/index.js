// React
import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import App from './App';
import { createRoot } from 'react-dom/client'

// NEAR
import { HelloNEAR } from './near-interface';
import { Wallet } from './near-wallet';

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
const wallet = new Wallet({ createAccessKeyFor: process.env.CONTRACT_NAME })

// Abstract the logic of interacting with the contract to simplify your flow
const helloNEAR = new HelloNEAR({ contractId: process.env.CONTRACT_NAME, walletToUse: wallet });

const client = new ApolloClient({
  uri: "https://interop-mainnet.hasura.app/v1/graphql",
  // uri: "https://interop-testnet.hasura.app/v1/graphql/",
  cache: new InMemoryCache()
});

window.onload = async () => {
  const isSignedIn = await wallet.startUp()
  const root = createRoot(document.getElementById('root'))

  root.render(
  <ApolloProvider client={client}>
    <App isSignedIn={isSignedIn} helloNEAR={helloNEAR} wallet={wallet} />
  </ApolloProvider>)
}