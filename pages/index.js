import { useState } from 'react';
import { Geist } from "next/font/google";
import Wallet from "../components/wallet";
import TransactionHistory from "../components/transactions";
import Tasks from "../components/tasks";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function Home() {
  const [pooBalance, setPooBalance] = useState(1000000); // Initial balance

  const handleToiletUse = (amount) => {
    setPooBalance(prevBalance => prevBalance - amount);
  };

  const handleTaskComplete = (amount) => {
    setPooBalance(prevBalance => prevBalance + amount);
  };

  return (
    <div className={`${geistSans.variable} min-h-screen font-[family-name:var(--font-geist-sans)]`}>
      {/* Header with Wallet */}
      <header className="fixed top-0 left-0 right-0 p-4 z-50">
        <div className="max-w-7xl mx-auto flex justify-end">
          <Wallet balance={pooBalance} />
        </div>
      </header>

      {/* Main Content with Transactions */}
      <main className="pt-20 pb-4 px-4">
        <Tasks onTaskComplete={handleTaskComplete} />
        <TransactionHistory onToiletUse={handleToiletUse} />
      </main>

      <div className="h-[100px]">
      </div>
    </div>
  );
}
