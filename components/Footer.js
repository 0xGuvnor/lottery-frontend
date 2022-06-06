export default function Footer() {
    return (
        <div className="border-blue-700 border-t-2 p5 font-sans px-4">
            <div className="pt-4 flex flex-row text-sky-700">
                <a href="https://faucets.chain.link/" target="_blank" rel="noopener noreferrer">
                    Get free testnet tokens
                </a>
            </div>
            <div className="flex flex-row text-sky-700">
                <a href="https://chainlist.org/" target="_blank" rel="noopener noreferrer">
                    Add BSC Testnet to your MetaMask
                </a>
            </div>
        </div>
    );
}
