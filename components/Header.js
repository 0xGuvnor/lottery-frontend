import { ConnectButton, CryptoLogos, Typography } from "web3uikit";

export default function Header() {
    return (
        <div className="border-b-2 p-8 flex flex-row">
            <div className="mt-1">
                <CryptoLogos chain="binance" size="48px" />
            </div>
            <div className="pt-1.5">
                <Typography variant="h1">LottFi</Typography>
            </div>
            <div className="ml-auto py-2 px-4">
                <ConnectButton />
            </div>
        </div>
    );
}
