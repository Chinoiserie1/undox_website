import useCurrentStatus from "@/hooks/useCurrentStatus";
import checkUserWhitelisted from "./checkUserWhitelisted";

const MintButtonETH = ({ approveMint }) => {
  const { status } = useCurrentStatus();

  const handleMint = () => {
    setErrorMint("");
    const res = checkUserWhitelisted(address, status);

    if (res.success) {
      console.log("AAAAAAAA");
      console.log(res);
      if (quantityCover1 == 0 && quantityCover2 == 0) {
        setErrorMint("Error can't mint zero quantity");
        return;
      }
      const value = getMintValue(res.status);

      storeMintClick({
        ETHAddress: address,
        cover1: quantityCover1,
        cover2: quantityCover2,
      });

      write({
        args: [
          address,
          quantityCover1,
          quantityCover2,
          res.cover1,
          res.cover2,
          res.signature,
        ],
        value: parseEther(value.toString()),
      });
    } else {
      if (status == 1) {
        setErrorMint("Error you are not allowlisted");
      } else if (status == 2) {
        setErrorMint("Error you are not whitelisted");
      } else {
        setErrorMint("Error something went wrong");
      }
    }
  };

  return (
    <div className="flex justify-center pt-6">
      <button
        className="w-1/2 px-4 py-2 text-white bg-black border border-white sm:w-1/4 hover:bg-white hover:text-black"
        disabled={!approveMint}
        onClick={handleMint}
      >
        {isLoading ? "loading" : status == 1 ? "MINT" : "MINT with ETH"}
      </button>
    </div>
  );
};

export default MintButtonETH;
