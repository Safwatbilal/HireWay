'use server';
import { createAdminClient } from "@/config/appwrite";

async function searchHouses({ prices, location }) {
    const { databases } = createAdminClient();
    const { documents: rooms } = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOM
    );

    console.log(prices);

    const filteredRooms = rooms.filter((room) => {

        const matchesLocation = !location || room.location.toLowerCase().includes(location.toLowerCase());


        const matchesPrice = room.price <= prices;

        return matchesLocation && matchesPrice;
    });

    return filteredRooms;
}

export default searchHouses;
