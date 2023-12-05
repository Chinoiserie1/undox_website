import { useBalance } from "wagmi";

const useWalletBalance = (address) => {
  const { data, isError, isLoading } = useBalance({
    address: address,
  });

  console.log(data);
  return data;
};

export default useWalletBalance;
