'use server'
import { createAdminClient } from "@/config/appwrite";
async function getAllHouse() {

    const { databases } = createAdminClient();
    console.log(databases)
    if (databases === undefined) {
        return 's'
    }
    const { documents: rooms } = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOM
    );

    console.log(process.env.NEXT_PUBLIC_APPWRITE_DATABASE)

    console.log(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOM)
    return rooms;

}

export default getAllHouse;
