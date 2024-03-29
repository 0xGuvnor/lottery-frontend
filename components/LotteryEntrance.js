import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";
import { abi, contractAddresses } from "../constants";
import { ethers } from "ethers";
import { Button, useNotification } from "web3uikit";

export default function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
    const chainId = parseInt(chainIdHex);
    const lotteryAddress =
        chainId in contractAddresses
            ? contractAddresses[chainId][
                  contractAddresses[chainId].length - 1
              ] /* retrieve most recently deployed address */
            : null;
    const [entranceFee, setEntranceFee] = useState("0");
    const [numPlayers, setNumPlayers] = useState("0");
    const [recentWinner, setRecentWinner] = useState("0");

    const dispatch = useNotification();

    const {
        runContractFunction: enterLottery,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi,
        contractAddress: lotteryAddress,
        functionName: "enterLottery",
        params: {},
        msgValue: entranceFee,
    });

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi,
        contractAddress: lotteryAddress,
        functionName: "getEntranceFee",
        params: {},
    });

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi,
        contractAddress: lotteryAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    });

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi,
        contractAddress: lotteryAddress,
        functionName: "getRecentWinner",
        params: {},
    });

    async function updateUI() {
        const entranceFeeFromCall = (await getEntranceFee()).toString();
        const numPlayersFromCall = (await getNumberOfPlayers()).toString();
        const recentWinnerFromcall = (await getRecentWinner()).toString();
        setEntranceFee(entranceFeeFromCall);
        setNumPlayers(numPlayersFromCall);
        setRecentWinner(recentWinnerFromcall);
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI();
        }
    }, [isWeb3Enabled]);

    const handleSuccess = async (tx) => {
        await tx.wait(1);
        handleNewNotification(tx);
        updateUI();
    };

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Tx Notification",
            position: "topR",
            icon: "metamask",
        });
    };

    const handlePendingNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Submitted...",
            title: "Tx Notification",
            position: "topR",
            icon: "metamask",
        });
    };

    return (
        <div className="p5 font-sans px-4 py-4">
            {lotteryAddress ? (
                <div className="mt-1">
                    <Button
                        className="shadow-md shadow-indigo-500/50"
                        size="large"
                        onClick={async () =>
                            await enterLottery({
                                onSuccess: handleSuccess,
                                onComplete: handlePendingNotification,
                                onError: (error) => console.log(error),
                            })
                        }
                        theme="primary"
                        type="button"
                        text="Enter Lottery"
                        disabled={isLoading || isFetching}
                        isLoading={isLoading || isFetching}
                    />
                    {/* <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded ml-auto"
                        onClick={async () =>
                            await enterLottery({
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }
                        disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            <div>Enter Lottery</div>
                        )}
                    </button> */}
                    <div>
                        Entrance Fee: <strong>{ethers.utils.formatEther(entranceFee)} tBNB</strong>
                    </div>
                    <div>
                        Number of Players: <strong>{numPlayers}</strong>
                    </div>
                    <div>
                        Recent Winner: <strong>{recentWinner}</strong>
                    </div>
                </div>
            ) : (
                <div>Oops! No Lottery Address Detected 🫠</div>
            )}
        </div>
    );
}
