import FormRaffle from "../../components/FormRaffle";

export default function  NewRafflePage () {
  return (
    <>
    <section className="flex flex-col gap-2 p-2 mx-2 mt-14 mb-8 bg-base-100 rounded-box shadow-md">

      <h1 className="text-2xl font-bold">Crear Nuevo Sorteo</h1>
      <FormRaffle />
    </section>
    </>
  );
};
