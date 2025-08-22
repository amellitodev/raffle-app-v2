export interface IRaffle {
	_id: string;
	title: string;
	description: string;
	imageUrl: string;
	raffleStart: string;
	raffleDate: string;
	rafflePrize: string;
	ticketPriceDolar: number;
	ticketPriceBolivar: number;
	paymentMethod: Array<{
		type: string;
		entityName: string;
		accountNumber?: string;
		phoneNumber?: string;
		email?: string;
		sellerId?: string;
	}>;
	maxTickets: number;
	status: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface IOrder {
  _id: string;
  raffleId: string;
  buyerName: string;
  buyerId: string;
  buyerEmail?: string;
  buyerPhone: string;
  amount: number;
  currency: "USD" | "EUR" | "VES";
  bank: string;
  paymentReference: string;
  paymentProof: string;
  ticketCount: number;
  ticketsAssigned: string[];
  status: "pending" | "paid" | "failed";
  createdAt?: Date;
  updatedAt?: Date;
}