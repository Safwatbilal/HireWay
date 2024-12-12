'use server'
import { cookies } from "next/headers";
import checkAuth from "./checkAuth";
import { ID } from "node-appwrite";
import { createSessionClient } from "@/config/appwrite";
import checkRoomAvailability from "./checkRoomAvailavility";
async function bookHouse(previousState, formData) {
    const sessionCookie = cookies().get('appwrite-session');
    if (!sessionCookie) {
        return {
            error: 'login first '
        }
    }

    const { databases } = await createSessionClient(sessionCookie.value);
    const { user } = await checkAuth()
    if (!user) {
        return {
            error: 'You must be logged in to book a room',
        };
    }

    // Extract date and time from the formData
    const checkInDate = formData.get('check_in_date');
    const checkInTime = formData.get('check_in_time');
    const checkOutDate = formData.get('check_out_date');
    const checkOutTime = formData.get('check_out_time');
    const roomId = formData.get('room_id');


    const checkInDateTime = `${checkInDate}T${checkInTime}`;
    const checkOutDateTime = `${checkOutDate}T${checkOutTime}`;
    const isAvailable = await checkRoomAvailability(
        roomId,
        checkInDateTime,
        checkOutDateTime
    );

    if (!isAvailable) {
        return {
            error: 'This room is already booked for the selected time',
        };
    }
    const bookingData = {
        check_in: checkInDateTime,
        check_out: checkOutDateTime,
        user_id: user.id,
        room_id: roomId,

    };

    // Create booking
    const newBooking = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKING,
        ID.unique(),
        bookingData
    );

    return {
        success: 'Booking successful',
    };
}

export default bookHouse;
