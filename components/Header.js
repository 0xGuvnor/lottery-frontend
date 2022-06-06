import { ConnectButton } from "web3uikit";

export default function Header() {
    return (
        <div className="border-b-2 p-5 flex flex-row">
            <h1 className="py-3 px-4 font-blog text-3xl">LottFi</h1>
            <div className="ml-auto py-2 px-4">
                <ConnectButton />
            </div>
        </div>
    );
}
