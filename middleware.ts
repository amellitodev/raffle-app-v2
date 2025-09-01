
export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard/:path*", "/dashboard/ordenes/detalles/:path*"] }