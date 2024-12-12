'use server';

import { createAdminClient } from '@/config/appwrite';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function getSingleRoom(id) {

    const { databases } = createAdminClient();

    // Fetch rooms
    const room = await databases.getDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOM,
        id
    );

    // Revalidate the cache for this path
    // revalidatePath('/', 'layout');

    return room;
}

export default getSingleRoom;
