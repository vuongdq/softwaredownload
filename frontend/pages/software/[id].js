import { useRouter } from 'next/router';
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';
import { StarIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function SoftwareDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data: software, error } = useSWR(
    id ? `/api/software/${id}` : null,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!software) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link href="/" className="text-primary hover:underline mr-4">
              ← Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              {software.data.name}
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Image */}
              <div className="relative h-96">
                <Image
                  src={software.data.thumbnail || '/default-thumbnail.png'}
                  alt={software.data.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              {/* Right Column - Details */}
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <StarIcon className="h-6 w-6 text-yellow-400" />
                    <span className="ml-2 text-lg">
                      {software.data.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <ArrowDownTrayIcon className="h-6 w-6 text-gray-500" />
                    <span className="ml-2 text-lg">
                      {software.data.downloads.toLocaleString()} downloads
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Version</h3>
                    <p className="mt-1">{software.data.version}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Size</h3>
                    <p className="mt-1">{software.data.size}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">License</h3>
                    <p className="mt-1">{software.data.license}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Operating Systems
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {software.data.os.map((os) => (
                        <span
                          key={os}
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                        >
                          {os}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Category</h3>
                    <p className="mt-1">{software.data.category.name}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Description
                    </h3>
                    <p className="mt-1 text-gray-600">
                      {software.data.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href={software.data.fileUrl}
                    className="btn btn-primary w-full text-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 