export { default } from "next-auth/middleware";

export const config = {
	matcher: [
		"/dashboard/:path*",
		"/dashboard/ordenes/detalles/:path*",
		"/api/order/:path*",
		"/api/orderbuyer/:path*",
		"/api/raffle/:path*",
        "/api/send/:path*",
		"/api/ticket/:path*",
		"/api/ticketnumber/:path*",

	],
};
