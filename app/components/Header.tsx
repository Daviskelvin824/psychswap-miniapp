import { Button } from "@/components/ui/button";
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
export default function Header() {
  return (
    <header className="flex justify-between items-center mb-3 h-11">
      <div>
        <div className="flex items-center space-x-2">
          <Wallet>
            <ConnectWallet>
              <Button>Connect Wallet</Button>
            </ConnectWallet>

            <WalletDropdown>
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address />
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
