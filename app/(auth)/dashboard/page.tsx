import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

import PublicProgressComponent from "@/app/(public)/components/PublicProgressComponent";
import { getRaffleInfo } from "@/app/actions/raffle.action";
import TopClients from "./components/TopClients";
import StatRaffle from "./components/StatRaffle";
import WelcomeComponent from "./components/WelcomeComponent";

// AÑADE ESTAS 2 LÍNEAS PARA DESACTIVAR SSG
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardPage() {
  // Ahora esto se ejecutará en el servidor (runtime), no durante build
  const { raffle, orders, tickets } = await getRaffleInfo();

  const title = raffle?.title.replace(/-/g, " ");

  return (
    <div className="px-4 py-6 sm:px-0 mt-6 max-w-5xl mx-auto">
      <div className="flex flex-col gap-4 border-gray-200 rounded-lg p-8">
        <WelcomeComponent />

        <div className=" p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Sorteo Activo</h3>
          <p className="text-3xl font-bold text-pink-500 mt-2">{title}</p>
        </div>
        <StatRaffle
          receivedOrders={orders.toLocaleString()}
          ticketsSold={tickets.toLocaleString()}
        />

        <PublicProgressComponent maxTickets={9999} raffleId={raffle?._id ?? ""} />

        <TopClients raffleId={raffle?._id.toString() || ""} />
      </div>
    </div>
  );
}