import Link from "next/link";
export default function HouseCart({ house }) {
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOM;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
  const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${house.image}/view?project=${projectId}`;
  const imageSrc = house.image ? imageUrl : '';

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105 `}
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={imageSrc}
          alt={house.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-bold py-1 px-3 rounded-lg">
          ${house.price}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate mb-2">
          {house.title}
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Location:</span> {house.location}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-medium">Type:</span> {house.type}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-medium">Created:</span>{" "}
          {new Date(house.createdTime).toLocaleDateString()}
        </p>

        {/* More Details Button */}
        <Link
          href={`/house/${house.$id}`}
          className="block mt-4 text-center bg-blue-500 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-600 transition"
        >
          More Details
        </Link>
      </div>
    </div>
  );
}
