"use client";
import { getRaffleById } from "@/app/actions/raffle.action";
import { IRaffle, TPaymentMethod } from "@/app/types/types";
import { useEffect, useState } from "react";

interface Props {
	raffleId: string;
}
export default function FormUpdateRaffle({ raffleId }: Props) {
	const [raffle, setRaffle] = useState<IRaffle | null>(null);
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [imageUrl, setImageUrl] = useState<string>("");
	const [raffleStart, setRaffleStart] = useState<string>("");
	const [raffleDate, setRaffleDate] = useState<string>("");
	const [rafflePrize, setRafflePrize] = useState<string>("");
	const [ticketPriceDolar, setTicketPriceDolar] = useState<number>(0);
	const [ticketPriceBolivar, setTicketPriceBolivar] = useState<number>(0);
	const [paymentMethod, setPaymentMethod] = useState<TPaymentMethod[]>([]);
	const [maxTickets, setMaxTickets] = useState<number>(0);
	const [status, setStatus] = useState<string>("");

	useEffect(() => {
		const fetchRaffle = async () => {
			const { data } = await getRaffleById(raffleId);
			setRaffle(data);
			setTitle(data.title.replace(/-/g, " ") || "");
			setDescription(data.description || "");
			setImageUrl(data.imageUrl || "");
			setRaffleStart(data.raffleStart || "");
			setRaffleDate(data.raffleDate || "");
			setRafflePrize(data.rafflePrize || "");
			setTicketPriceDolar(data.ticketPriceDolar || 0);
			setTicketPriceBolivar(data.ticketPriceBolivar || 0);
			setPaymentMethod(data.paymentMethod || []);
			setMaxTickets(data.maxTickets || 0);
			setStatus(data.status || "");
		};
		if (raffleId) {
			fetchRaffle();
		}
	}, [raffleId]);

	return (
		<>
			<div className="flex flex-col justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">Actualizar Sorteo: {title}</h1>
				<div className="flex justify-between gap-2 w-full">
					<button className="btn btn-primary rounded-md" type="submit">
						Actualizar Sorteo
					</button>
				</div>
			</div>

			<section className="flex flex-col md:flex-row w-full gap-4">
				<div className="flex flex-col gap-2 w-1/2">
					<label htmlFor="title">Title</label>
					<input
						className="input input-bordered w-full "
						type="text"
						value={title}
						name="title"
						onChange={(e) => setTitle(e.target.value)}
					/>
					<label htmlFor="description">Description</label>
					<input
						className="input input-bordered w-full"
						type="text"
						value={description}
						name="description"
						onChange={(e) => setDescription(e.target.value)}
					/>
					<label htmlFor="status">Status</label>
					<select
						className="select select-primary w-full"
						name="status"
						id="status"
						value={status}
						onChange={(e) => setStatus(e.target.value)}
					>
						<option value="active">Active</option>
						<option value="completed">Completado</option>
					</select>
					<label htmlFor="maxTickets">Max Tickets</label>
					<input
						className="input input-bordered w-full"
						type="number"
						value={maxTickets}
						name="maxTickets"
						onChange={(e) => setMaxTickets(Number(e.target.value))}
					/>

					<label htmlFor="raffleStart">Raffle Start</label>
					<input
						className="input input-bordered w-full"
						type="datetime-local"
						value={raffleStart}
						name="raffleStart"
						onChange={(e) => setRaffleStart(e.target.value)}
					/>
					<label htmlFor="raffleDate">Raffle Date</label>
					<input
						className="input input-bordered w-full"
						type="datetime-local"
						value={raffleDate}
						name="raffleDate"
						onChange={(e) => setRaffleDate(e.target.value)}
					/>
					<label htmlFor="rafflePrize">Raffle Prize</label>
					<input
						className="input input-bordered w-full"
						type="text"
						value={rafflePrize}
						name="rafflePrize"
						onChange={(e) => setRafflePrize(e.target.value)}
					/>
					<label htmlFor="ticketPriceDolar">Ticket Price (USD)</label>
					<input
						className="input input-bordered w-full"
						type="number"
						value={ticketPriceDolar}
						name="ticketPriceDolar"
						onChange={(e) => setTicketPriceDolar(Number(e.target.value))}
					/>
					<label htmlFor="ticketPriceBolivar">Ticket Price (VES)</label>
					<input
						className="input input-bordered w-full"
						type="number"
						value={ticketPriceBolivar}
						name="ticketPriceBolivar"
						onChange={(e) => setTicketPriceBolivar(Number(e.target.value))}
					/>
					<label htmlFor="imageUrl">Image URL</label>
					<input
						className="input input-bordered w-full"
						type="text"
						value={imageUrl}
						name="imageUrl"
						onChange={(e) => setImageUrl(e.target.value)}
					/>
					<img src={imageUrl} alt={title} />
				</div>

				{/* métodos de pago */}
				<div className="flex flex-col gap-2 w-1/2">
					{paymentMethod.map((method, index) => (
						<div className="border flex flex-col" key={index}>
							<label htmlFor="paymentMethod">Payment Method: {index + 1}</label>
							<input
								type="text"
								value={method.type}
								onChange={(e) => {
									const newMethods = [...paymentMethod];
									newMethods[index].type = e.target.value;
									setPaymentMethod(newMethods);
								}}
							/>
							<label htmlFor={`entityName-${index}`}>Entidad</label>
							<input
								className="input input-bordered w-full max-w-xs"
								type="text"
								value={method.entityName}
								onChange={(e) => {
									const newMethods = [...paymentMethod];
									newMethods[index].entityName = e.target.value;
									setPaymentMethod(newMethods);
								}}
							/>
							<label htmlFor={`accountNumber-${index}`}>Número de cuenta</label>
							<input
								className="input input-bordered w-full max-w-xs"
								type="text"
								value={method.accountNumber}
								onChange={(e) => {
									const newMethods = [...paymentMethod];
									newMethods[index].accountNumber = e.target.value;
									setPaymentMethod(newMethods);
								}}
							/>
							<label htmlFor={`phoneNumber-${index}`}>Teléfono</label>
							<input
								className="input input-bordered w-full max-w-xs"
								type="text"
								value={method.phoneNumber}
								onChange={(e) => {
									const newMethods = [...paymentMethod];
									newMethods[index].phoneNumber = e.target.value;
									setPaymentMethod(newMethods);
								}}
							/>
							<label htmlFor={`email-${index}`}>Email</label>
							<input
								className="input input-bordered w-full max-w-xs"
								type="text"
								value={method.email}
								onChange={(e) => {
									const newMethods = [...paymentMethod];
									newMethods[index].email = e.target.value;
									setPaymentMethod(newMethods);
								}}
							/>
							<label htmlFor={`sellerId-${index}`}>Cédula</label>
							<input
								className="input input-bordered w-full max-w-xs"
								type="text"
								value={method.sellerId}
								onChange={(e) => {
									const newMethods = [...paymentMethod];
									newMethods[index].sellerId = e.target.value;
									setPaymentMethod(newMethods);
								}}
							/>
						</div>
					))}
				</div>
			</section>
		</>
	);
}
