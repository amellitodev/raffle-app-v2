
export default function  TicketUserData () {
  return (
    <><section className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs" htmlFor="buyerName">Tu nombre Completo</label>
          <input className="input rounded-md w-full text-slate-950 bg-slate-200" type="text" name="buyerName" id="buyerName" placeholder="Ej: Juan Pérez" required />
        </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs" htmlFor="buyerId">Tu numero de cédula</label>
        <input className="input rounded-md w-full text-slate-950 bg-slate-200" type="text" name="buyerId" id="buyerId" placeholder="Ej: 12345678" required />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs" htmlFor="buyerEmail">Tu Email</label>
        <input className="input rounded-md w-full text-slate-950 bg-slate-200" type="email" name="buyerEmail" id="buyerEmail" placeholder="Ej: juanperez@gmail.com" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs" htmlFor="buyerPhone">Tu Teléfono</label>
        <input className="input rounded-md w-full text-slate-950 bg-slate-200" type="tel" name="buyerPhone" id="buyerPhone" placeholder="Ej: 04123344556" required />
      </div>
    </section>
    </>
  );
};
