import connectMongoDB from "@/app/lib/mongoConnection";
import RaffleModel from "@/app/lib/models/raffle.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectMongoDB();
        const {id } = await params;
        const raffle = await RaffleModel.findById(id);
        if (!raffle) {
            return NextResponse.json({ message: "Raffle not found", error: "404" });
        }
        return NextResponse.json({ message: "Raffle fetched successfully", data: raffle });
    } catch {
        return NextResponse.json({ message: "Error fetching raffle", error: "500" });
    }
}

// export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
//     try {
//         await connectMongoDB();
//         const { id } = await params;
//         const raffle = await RaffleModel.findByIdAndDelete(id);
//         if (!raffle) {
//             return NextResponse.json({ message: "Raffle not found", error: "404" });
//         }
//         return NextResponse.json({ message: "Raffle deleted successfully", data: raffle });
//     } catch {
//         return NextResponse.json({ message: "Error deleting raffle", error: "500" });
//     }
// }

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectMongoDB();
        const { id } = await params;
        const body = await request.json();
        const updatedRaffle = await RaffleModel.findByIdAndUpdate(id, body, { new: true });
        if (!updatedRaffle) {
            return NextResponse.json({ message: "Raffle not found", error: "404" });
        }
        return NextResponse.json({ message: "Raffle updated successfully", data: updatedRaffle });
    } catch {
        return NextResponse.json({ message: "Error updating raffle", error: "500" });
    }
}
