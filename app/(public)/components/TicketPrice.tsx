"use client";
interface Props {
	ticketPriceDolar: number;
	ticketPriceBolivar: number;
	selectedCurrency: string;
	setSelectedCurrency: React.Dispatch<React.SetStateAction<string>>;
	setSelectedPrice: React.Dispatch<React.SetStateAction<number>>;
}

export default function TicketPrice({
	ticketPriceDolar,
	ticketPriceBolivar,
	selectedCurrency,
	setSelectedCurrency,
	setSelectedPrice,
}: Props) {
	const selectPriceDolar = () => {
		setSelectedPrice(ticketPriceDolar);
		setSelectedCurrency("USD");
	};

	const selectPriceBolivar = () => {
		setSelectedPrice(ticketPriceBolivar);
		setSelectedCurrency("VES");
	};
	const currencyDolarStyle = `btn rounded-md ${
		selectedCurrency === "USD" ? "bg-warning text-slate-950 h-12 text-2xl font-bold w-1/2" : "bg-disabled"
	}`;
	const currencyBolivarStyle = `btn rounded-md ${
		selectedCurrency === "VES" ? "bg-warning text-slate-950 h-12 text-2xl font-bold w-1/2" : "bg-disabled"
	}`;

	return (
		<>
        <section className="flex flex-col gap-2 w-full">

			<span className="text-md w-full text-center">💵 Moneda de Pago</span>
			<div className="flex gap-8 justify-center items-center">
			<input type="text" name="currency" value={selectedCurrency} readOnly hidden />
				<button className={currencyDolarStyle} type="button" onClick={selectPriceDolar}>
				 {ticketPriceDolar} 	$
				</button>
				<button className={currencyBolivarStyle} type="button" onClick={selectPriceBolivar}>
				 {ticketPriceBolivar} 	Bs
				</button>
			</div>
        </section>
		</>
	);
}
