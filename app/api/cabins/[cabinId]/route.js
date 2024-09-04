import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

// sec 35 lec 9 it's just for checking endpoints
export async function GET(request, { params }) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getBookedDatesByCabinId(cabinId),
      getCabin(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}

// export async function POST() {}
