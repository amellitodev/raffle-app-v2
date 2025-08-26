import ListOrder from "../../components/ListOrder";

export default async function page({params}: {params: Promise<{raffleId: string}>}) {
  const { raffleId } = await params;
  return (
    <>
    <div className="mx-2">

      <h1 className="mt-14 block text-2xl font-bold">Mis Órdenes</h1>
      <ListOrder raffleId={raffleId} />
    </div>
    </>
  );
};
