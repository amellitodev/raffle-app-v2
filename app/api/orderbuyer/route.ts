import OrderModel from "@/app/lib/models/order.model";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const buyerId = searchParams.get('buyerId');
  const raffleId = searchParams.get('raffleId'); 
  console.log("🚀 ~ GET ~ buyerId, raffleId:", buyerId, raffleId)
  try {
    if (!buyerId || !raffleId) {
        return NextResponse.json({ error: 'Missing buyerId or raffleId' }, { status: 400 });
    }

    const orders = await OrderModel.find({ buyerId, raffleId });
    if (orders.length === 0) {
        return NextResponse.json({ message: 'No orders found' }, { status: 404 });
    }

    return NextResponse.json({ message: "Orders fetched successfully", data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: 'Error fetching orders' }, { status: 500 });
    }

   
}