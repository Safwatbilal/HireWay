'use server';

import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';

// دالة لجلب تواريخ الحجز لغرفة معينة
async function getRoomBookings(roomId) {
    const sessionCookie = cookies().get('appwrite-session');
    if (!sessionCookie) {
        throw new Error('You must be logged in to view bookings.');
    }

    try {
        const { databases } = await createSessionClient(sessionCookie.value);

        // جلب جميع الحجوزات المرتبطة بـ roomId
        const { documents: bookings } = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKING,
            [Query.equal('room_id', roomId)]
        );

        // إعادة تواريخ الحجز فقط
        const bookingDates = bookings.map((booking) => ({
            checkIn: booking.check_in,
            checkOut: booking.check_out,
        }));

        return bookingDates;
    } catch (error) {
        console.error('Failed to fetch bookings:', error);
        throw new Error('Unable to fetch bookings at the moment.');
    }
}

export default getRoomBookings;
