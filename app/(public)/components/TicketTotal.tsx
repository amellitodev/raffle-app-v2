interface Props {
  calcAmount: () => number;
  selectedCurrency: string;
}

export default function  TicketTotal ({ calcAmount, selectedCurrency }: Props) {
  return (
    <>
        <div className="flex flex-col justify-center items-center mt-4 p-4 border rounded-md border-gray-800/30">
           <strong className="text-primary">🫰 Total a Pagar</strong> 
            <p className="text-2xl font-bold">{calcAmount()} {selectedCurrency}</p>

        </div>

        <input type="text" name="amount" value={calcAmount()} readOnly hidden />
    </>
  );
};
