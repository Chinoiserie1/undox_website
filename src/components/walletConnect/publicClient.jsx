import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

// const chain = process.env.NEXT_PUBLIC_CHAIN == 1 ? mainnet : goerli;

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

// const chain = process.env.NEXT_PUBLIC_CHAIN == 1 ? mainnet : goerli;

// export const publicClient = createPublicClient({
//   chain: chain,
//   transport: http(),
// });

// // const { publicClient } = configureChains([chain], [publicProvider()]);

// const config = createConfig({
//   publicClient,
// });

// console.log(config);

// function PublicClient({ children }) {
//   return <WagmiConfig config={config}>{children}</WagmiConfig>;
// }

// export default PublicClient;
