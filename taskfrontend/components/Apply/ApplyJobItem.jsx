import Link from "next/link";

const ApplyJobItem = ({ name, Id, status }) => {
  const borderColor = status === "Panding" ? "border-black" : status === "Accepted" ? "border-green-500" : "border-red-500";

  return (
    <div className={`bg-bgSecond px-4 py-2 rounded-lg shadow-lg w-full max-w-md border-2 ${borderColor}`}>
      <div className="flex items-center justify-between">
        <strong className="text-second">Name:</strong>
        <p className="text-gray-300 text-base px-4 py-2">{name}</p>
        <Link href={`/details/${Id}`} className="buttonHeader text-white">
          More Details
        </Link>
      </div>
    </div>
  );
};

export default ApplyJobItem;
