import { useBalance } from "wagmi";

const useWalletBalance = (address) => {
  const { data, isError, isLoading } = useBalance({
    address: address,
  });

  return data ? data.value : 0;
};

export default useWalletBalance;
