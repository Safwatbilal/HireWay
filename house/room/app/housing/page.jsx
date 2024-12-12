
import BookedRoomCard from '@/components/Booking';
import getMyBookings from '../actions/getMyBooking';
const BookingsPage = async () => {
  const bookings = await getMyBookings();
console.log(bookings)
  return (
    <>
      
      {bookings.length === 0 ? (
        <p className='text-gray-600 mt-4'>You have no bookings</p>
      ) : (
        bookings.map((booking) => (
          <BookedRoomCard key={booking.$id} booking={booking} />
        ))
      )}
    </>
  );
};

export default BookingsPage;
