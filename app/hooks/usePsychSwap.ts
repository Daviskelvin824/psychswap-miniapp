import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { useState } from "react";
import { waitForTransactionReceipt } from "@wagmi/core";
import toast from "react-hot-toast";
import { CONTRACTS, PSYCHSWAP_ABI } from "@/app/constants/abi";
import { config } from "@/app/lib/wagmi";
import { base, baseSepolia } from "wagmi/chains";

export const usePsychswap = () => {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const [isSaving, setIsSaving] = useState(false);

  // ✅ READ: Personality (MBTI) of current user
  const {
    data: myPersonality,
    isLoading: isPersonalityLoading,
    refetch: refetchPersonality,
  } = useReadContract({
    address: CONTRACTS.PSYCHSWAP,
    abi: PSYCHSWAP_ABI,
    functionName: "getPersonality",
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 30000 },
  });

  // ✅ READ: Token ID of current user
  const {
    data: myTokenId,
    isLoading: isTokenIdLoading,
    refetch: refetchTokenId,
  } = useReadContract({
    address: CONTRACTS.PSYCHSWAP,
    abi: PSYCHSWAP_ABI,
    functionName: "getTokenId",
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 30000 },
  });

  // ✅ WRITE: Save or update personality
  const savePersonality = async (mbti: string, tokenURI: string) => {
    if (!address || !mbti || !tokenURI) return false;
    setIsSaving(true);

    try {
      await ensureBaseSepolia(); // ✅ make sure wallet is on Base Sepolia

      toast.loading("Saving personality...", { id: "psychswap" });
      const hash = await writeContractAsync({
        address: CONTRACTS.PSYCHSWAP,
        abi: PSYCHSWAP_ABI,
        functionName: "savePersonality",
        args: [mbti, tokenURI],
        account: address,
        chain: baseSepolia,
      });

      await waitForTransactionReceipt(config, { hash });
      toast.success("Personality saved!", { id: "psychswap" });

      refetchPersonality();
      refetchTokenId();
      return true;
    } catch (err) {
      console.error(err);
      toast.error("Save failed", { id: "psychswap" });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    myPersonality: (myPersonality as string) || "",
    myTokenId: (myTokenId as bigint) || BigInt(0),
    isPersonalityLoading,
    isTokenIdLoading,
    refetchPersonality,
    refetchTokenId,
    savePersonality,
    isSaving,
  };
};

async function ensureBaseSepolia() {
  if (!window.ethereum) return;

  const currentChainId = await window.ethereum.request({
    method: "eth_chainId",
  });

  if (currentChainId !== `0x${baseSepolia.id.toString(16)}`) {
    try {
      // Try switching
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${baseSepolia.id.toString(16)}` }], // 0x14A34
      });
    } catch (switchError: any) {
      // If not added yet, add it
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: `0x${baseSepolia.id.toString(16)}`,
              chainName: "Base Sepolia",
              nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: ["https://sepolia.base.org"],
              blockExplorerUrls: ["https://sepolia.basescan.org"],
            },
          ],
        });
      }
    }
  }
}
