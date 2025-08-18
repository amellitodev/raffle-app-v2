export async function getRaffleData() {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/raffle`, { cache: "no-store" });
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return response.json();
	} catch (error) {
		console.error("Error fetching raffle data:", error);
		throw error;
	}
}
