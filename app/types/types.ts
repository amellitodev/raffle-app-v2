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
