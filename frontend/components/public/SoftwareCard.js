import Image from 'next/image';
import Link from 'next/link';
import { StarIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';

const SoftwareCard = ({ software }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="relative h-48 w-full mb-4">
        <Image
          src={software.thumbnail || '/default-thumbnail.png'}
          alt={software.name}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{software.name}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{software.description}</p>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <StarIcon className="h-5 w-5 text-yellow-400" />
          <span>{software.rating.toFixed(1)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <ArrowDownTrayIcon className="h-5 w-5 text-gray-500" />
          <span>{software.downloads.toLocaleString()}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {software.os.map((os) => (
          <span
            key={os}
            className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-md"
          >
            {os}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Version {software.version}</span>
        <Link
          href={`/software/${software._id}`}
          className="btn btn-primary"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default SoftwareCard; 