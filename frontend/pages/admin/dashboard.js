import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import AdminDashboard from '../../components/admin/AdminDashboard';

const fetcher = (url, token) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => res.json());

export default function Dashboard() {
  const router = useRouter();
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      router.push('/admin/login');
    } else {
      setToken(storedToken);
    }
  }, [router]);

  const { data: softwareStats } = useSWR(
    token ? '/api/software' : null,
    (url) => fetcher(url, token)
  );

  const { data: categoryStats } = useSWR(
    token ? '/api/categories' : null,
    (url) => fetcher(url, token)
  );

  if (!token) return null;

  return (
    <AdminDashboard>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Software */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Total Software
          </h3>
          <p className="text-3xl font-bold text-primary">
            {softwareStats?.total || 0}
          </p>
        </div>

        {/* Total Categories */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Total Categories
          </h3>
          <p className="text-3xl font-bold text-primary">
            {categoryStats?.count || 0}
          </p>
        </div>

        {/* Total Downloads */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Total Downloads
          </h3>
          <p className="text-3xl font-bold text-primary">
            {softwareStats?.data?.reduce(
              (acc, curr) => acc + curr.downloads,
              0
            ).toLocaleString() || 0}
          </p>
        </div>
      </div>

      {/* Recent Software */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Recently Added Software
        </h3>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Downloads
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Added
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {softwareStats?.data
                ?.slice(0, 5)
                .map((software) => (
                  <tr key={software._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {software.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {software.category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {software.downloads.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(software.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminDashboard>
  );
} 