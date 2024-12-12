import getRoomBookings from "@/app/actions/date";
import getSingleRoom from "@/app/actions/getSigneHouse";
import BookingForm from "@/components/HouseForm";

const RoomPage = async ({ params }) => {
  const { id } = params;
  const property = await getSingleRoom(id);
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOM;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  const today = new Date();
  const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${property.image}/view?project=${projectId}`;

  if (!property) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-600">Room Not Found</h1>
      </div>
    );
  }

  const bookings = await getRoomBookings(id);

  // تحديد آخر حجز
  const lastBooking =
    bookings.length > 0
      ? bookings.reduce((latest, current) =>
          new Date(latest.checkOut) > new Date(current.checkOut) ? latest : current
        )
      : null;

  const isAvailable = bookings.length === 0;

  return (
    <div className="flex flex-col items-center min-h-screen p-6 space-y-6 bg-gray-50">
      {/* Image Section */}
      <div className="w-full lg:w-3/4 bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={property.title}
          className="w-full h-72 object-cover"
        />
      </div>

      {/* Details Section */}
      <div className="w-full lg:w-3/4 bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">{property.title}</h2>
        <div className="h-32 overflow-y-auto border p-4 rounded-md bg-gray-50">
          <p className="text-gray-600">{property.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="text-lg font-semibold text-gray-700">${property.price}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Type</p>
            <p className="text-lg font-semibold text-gray-700">{property.type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="text-lg font-semibold text-gray-700">{property.location}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Created By</p>
            <p className="text-lg font-semibold text-gray-700">{property.Created}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Created Time</p>
            <p className="text-lg font-semibold text-gray-700">
              {new Date(property.createdTime).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Booking Status */}
        <div
          className={`text-lg font-bold py-2 px-4 rounded-md ${
            isAvailable ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {isAvailable ? "Available" : "Not Available"}
        </div>

        {/* Last Bookings Section */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">All Bookings</h3>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => {
              // check if booking's checkout date is in the future
              const checkOutDate = new Date(booking.checkOut);
              if (checkOutDate > today) {
                return (
                  <div key={index} className="text-gray-600 mb-4">
                    <p>
                      <span className="font-bold">Booking Current:</span>
                      <br />
                      <span className="font-semibold">From:</span>{" "}
                      {new Date(booking.checkIn).toLocaleString()}
                      <br />
                      <span className="font-semibold">To:</span>{" "}
                      {new Date(booking.checkOut).toLocaleString()}
                    </p>
                  </div>
                );
              }
              return null; // skip past bookings
            })
          ) : (
            <p className="text-gray-600">No bookings yet.</p>
          )}
        </div>
      </div>

      {/* Booking Form */}
      <BookingForm room={property}></BookingForm>
    </div>
  );
};

export default RoomPage;
