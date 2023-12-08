import { useRouter } from "next/navigation";

const useRedirectionMintPage = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/mint");
  };

  return { handleButtonClick };
};

export default useRedirectionMintPage;
