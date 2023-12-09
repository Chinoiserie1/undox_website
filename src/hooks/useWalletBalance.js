import { useBalance } from "wagmi";

const useWalletBalance = (address) => {
  const { data, isError, isLoading } = useBalance({
    address: address,
  });

  return data;
};

export default useWalletBalance;
