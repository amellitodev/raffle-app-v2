// import ListOrder from "../../components/ListOrder";
import FindOrder from "../../components/FindOrder";
import PaginateOrders from "../../components/PaginateOrders";

export default async function page({params}: {params: Promise<{raffleId: string}>}) {
  const { raffleId } = await params;
  return (
    <>
    <div className="mx-2 bg-slate-50">

      <h1 className="mt-14 block text-2xl font-bold">Mis Órdenes</h1>
      {/* <ListOrder raffleId={raffleId} /> */}
      <FindOrder raffleId={raffleId} />
      <PaginateOrders raffleId={raffleId} />
    </div>
    </>
  );
};
