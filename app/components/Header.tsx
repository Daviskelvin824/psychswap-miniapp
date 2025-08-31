"use client";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { color } from "@coinbase/onchainkit/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <header className="flex justify-between items-center mb-3 h-11">
      <Image
        src="/psychswap-icon.png" // note the leading slash
        width={50}
        height={50}
        alt="icon"
        className="cursor-pointer"
        onClick={() => router.push("/")}
      />

      <div>
        <div className="flex items-center space-x-2">
          <Wallet>
            <ConnectWallet
              disconnectedLabel="Connect Wallet"
              className="bg-orange-400 hover:bg-orange-300"
            >
              <Avatar className="h-6 w-6" />
              <Name className="text-black" />
            </ConnectWallet>

            <WalletDropdown>
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name className={color.foregroundMuted} />
                <Address className={color.foregroundMuted} />
                <EthBalance />
              </Identity>
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
        </div>
      </div>
      {/* <div>{saveFrameButton}</div> */}
    </header>
  );
}
