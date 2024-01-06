import { useBalance } from "wagmi";

const useWalletBalance = (address) => {
  const { data, isError, isLoading } = useBalance({
    address: address,
  });

  return data.value;
};

export default useWalletBalance;
