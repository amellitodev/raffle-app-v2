import { getRaffleInfoByRaffleId } from "@/app/actions/actions";
import { UsersIcon } from "./icons/icons";
interface Props {
    maxTickets: number;
    raffleId: string;
}

export default async function  PublicProgressComponent ({ maxTickets, raffleId }: Props) {
    const { tickets } = await getRaffleInfoByRaffleId(raffleId);
    const soldTickets = tickets
    const remainingTickets = maxTickets - soldTickets;
  return (
    <div className=" bg-white p-6 rounded-lg shadow my-4">
                <div className="flex items-center gap-2">
                    <UsersIcon className="size-8" />
                    <p className="text-lg font-bold">Progreso de la rifa</p>
                </div>
                <progress
                    className="progress progress-warning w-full"
                    value={soldTickets}
                    max={maxTickets}
                ></progress>
                <div className="flex items-center justify-between mb-2">
                    <div className="flex flex-col items-center align-middle text-center border border-gray-200 rounded-lg p-2 mt-2 min-h-26">
                        <span>Vendidos</span>
                        <span>{soldTickets.toLocaleString()}</span>
                    </div>
    
                    <div className="flex flex-col items-center align-middle text-center border border-gray-200 rounded-lg p-2 mt-2 min-h-26">
                        <span>Disponibles</span>
                        <span>{remainingTickets.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col items-center align-middle text-center border border-gray-200 rounded-lg p-2 mt-2 min-h-26">
                        <span>Max Tickets</span>
                        <span>{maxTickets.toLocaleString()}</span>
                    </div>
                </div>
            </div>
  );
};
