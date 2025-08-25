

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
	paymentMethod: Array<TPaymentMethod>;
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
  status?: "pending" | "paid" | "failed";
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
export interface ITicket {
  _id: string;
  raffleId: string;
  orderId: string;
  ticketNumber: number;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

export interface IOrderPopulated {
  _id: string;
  raffleId: IRaffle | string;
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
  ticketsAssigned: ITicket[] | string[];
  status?: "pending" | "paid" | "failed";
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

export type TPaymentMethod = {
  type: string;
  entityName: string;
  accountNumber?: string;
  phoneNumber?: string;
  email?: string;
  sellerId?: string;
}

