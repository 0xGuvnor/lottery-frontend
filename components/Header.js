import { ConnectButton } from "web3uikit";

export default function Header() {
    return (
        <div className="border-blue-700 border-b-2 p-6 flex flex-row">
            <h1 className="px-4 py-2 font-bold text-3xl">LottFi</h1>
            <div className="ml-auto py-2 px-4">
                <ConnectButton className="shadow-xl" />
            </div>
        </div>
    );
}
