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
	raffleId: string | IRaffle;
	orderId: string | IOrder;
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
};

export interface TicketData {
	_id: string;
	ticketNumber: number;
	raffleId: Pick<IRaffle, "_id" | "title">;
	orderId: Pick<
		IOrder,
		| "_id"
		| "status"
		| "buyerName"
		| "buyerId"
		| "buyerPhone"
		| "ticketCount"
		| "ticketsAssigned"
	>;
}

export interface ITicketResponseData {
	raffleTitle?: string;
	totalTickets?: number;
	tickets: Ticket[];
	docs: Docs;
}

export interface Docs {
	totalPages: number;
	limit: number;
	prevPage: number;
	currentPage: number;
	nextPage: number;
}

export interface Ticket {
	_id: string;
	raffleId: RaffleID | null;
	orderId: OrderID | null;
	ticketNumber?: number;
	__v: number;
	createdAt?: string;
	updatedAt?: string;
}

export interface OrderID {
	_id: string;
	status: string;
	buyerName: string;
	ticketCount: number;
	ticketsAssigned: string[];
}

export interface RaffleID {
	_id: string;
	title: string;
}

export interface IOrdersResponse {
	message: string;
	orders: Order[];
	docs: Docs;
}

export interface Docs {
	totalPages: number;
	limit: number;
	prevPage: number;
	currentPage: number;
	nextPage: number;
}

export interface Order {
	_id: string;
	raffleId: string;
	buyerName: string;
	buyerId: string;
	buyerEmail: string;
	buyerPhone: string;
	amount: number;
	currency: string;
	bank: string;
	paymentReference: string;
	paymentProof: string;
	ticketCount: number;
	ticketsAssigned: ITicket[];
	status: string;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	raffleInfo: RaffleInfo;
}

export interface RaffleInfo {
	id: string;
}

export interface IOrderResponseVerify {
	message: string;
	data: IOrderverify[];
}

export interface IOrderverify {
	_id: string;
	raffleId: {
		_id: string;
		title: string;
		
	};
	buyerName: string;
	ticketCount: number;
	ticketsAssigned: {
		_id: string;
		ticketNumber: number;
	}[];
	status: string;
}
