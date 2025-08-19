export interface IRaffle {
	_id: string;
	title: string;
	description: string;
	imageUrl: string;
	raffleDate: string;
	ticketPrice: number;
	maxTickets: number;
	status: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface IOrder {
  _id: string;
  raffleId: string;
  buyerFirstName: string;
  buyerLastName: string;
  buyerId: string;
  buyerEmail?: string;
  buyerPhone: string;
  amount: number;
  currency: "USD" | "EUR" | "VES";
  bank: string;
  paymentReference: string;
  ticketNumbers: number[];
  ticketsAssigned: string[];
  status: "pending" | "paid" | "failed";
  createdAt?: Date;
  updatedAt?: Date;
}