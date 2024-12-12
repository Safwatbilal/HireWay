'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useActionState } from 'react';
import bookHouse from '@/app/actions/bookhouse';

const BookingForm = ({ room }) => {
  const router = useRouter();
  const [state, formAction] = useActionState(bookHouse, {});

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success) {
      toast.success('Room has been booked!');
      router.push('/house');
    }
  }, [state]);

  return (
    <div className="w-full lg:w-3/4 bg-white rounded-lg shadow-lg p-8 space-y-6 transform transition-all duration-300 hover:scale-105">
      <h2 className="text-2xl font-bold text-gray-800 tracking-wide mb-4">
        Book Your House
      </h2>
      <p className="text-gray-600 mb-6">
        Please provide your booking details to reserve the room from the selected dates and times.
      </p>
      <form className="space-y-6" action={formAction}>
        <input type="hidden" name="room_id" value={room.$id} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Check-In Date */}
          <div>
            <label
              htmlFor="check_in_date"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Check-In Date
            </label>
            <input
              type="date"
              id="check_in_date"
              name="check_in_date"
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Check-In Time */}
          <div>
            <label
              htmlFor="check_in_time"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Check-In Time
            </label>
            <input
              type="time"
              id="check_in_time"
              name="check_in_time"
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Check-Out Date */}
          <div>
            <label
              htmlFor="check_out_date"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Check-Out Date
            </label>
            <input
              type="date"
              id="check_out_date"
              name="check_out_date"
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Check-Out Time */}
          <div>
            <label
              htmlFor="check_out_time"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Check-Out Time
            </label>
            <input
              type="time"
              id="check_out_time"
              name="check_out_time"
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          >
            Book the House
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
