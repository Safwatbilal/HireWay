'use server';
import { createAdminClient } from '@/config/appwrite';
import checkAuth from './checkAuth';
import { ID } from 'node-appwrite';
import { revalidatePath } from 'next/cache';

async function createRoom(previousState, formData) {
    // Get databases instance
    const { databases, storage } = await createAdminClient();

    try {
        const { user } = await checkAuth();

        if (!user) {
            return {
                error: 'You must be logged in to create a room',
            };
        }

        // Uploading image
        let imageID;

        const image = formData.get('image');

        if (image && image.size > 0 && image.name !== 'undefined') {
            try {
                // Upload
                const response = await storage.createFile('room', ID.unique(), image);
                imageID = response.$id;
            } catch (error) {
                console.log('Error uploading image', error);
                return {
                    error: 'Error uploading image',
                };
            }
        } else {
            console.log('No image file provided or file is invalid');
        }

        // Create room
        const newRoom = await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOM,
            ID.unique(),
            {
                owner_id: user.id,
                title: formData.get('title'),
                description: formData.get('description'),

                location: formData.get('location'),

                price: formData.get('price'),

                image: imageID,
            }
        );

        revalidatePath('/', 'layout');

        return {
            success: true,
        };
    } catch (error) {
        console.log(error);
        const errorMessage =
            error.response.message || 'An unexpected error has occured';
        return {
            error: errorMessage,
        };
    }
}

export default createRoom;
