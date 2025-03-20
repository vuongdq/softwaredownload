import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import AdminDashboard from '../../components/admin/AdminDashboard';
import toast from 'react-hot-toast';

const fetcher = async (url) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || 'API Error');
    }
    return data;
  } catch (error) {
    console.error('Fetch error:', error, 'URL:', url);
    throw error;
  }
};

export default function SoftwareManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSoftware, setEditingSoftware] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    version: '',
    size: '',
    os: [],
    license: '',
    category: '',
    fileUrl: '',
    thumbnail: ''
  });

  const { data: software, error: softwareError } = useSWR(
    `/api/software?page=${currentPage}&search=${searchTerm}`,
    fetcher
  );

  const { data: categories, error: categoriesError } = useSWR('/api/categories', fetcher);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editingSoftware
        ? `/api/software/${editingSoftware._id}`
        : '/api/software';

      const response = await fetch(url, {
        method: editingSoftware ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Error saving software');
      }

      toast.success(
        editingSoftware ? 'Software updated successfully' : 'Software created successfully'
      );
      setIsModalOpen(false);
      setEditingSoftware(null);
      mutate(`/api/software?page=${currentPage}&search=${searchTerm}`);
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this software?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/software/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Error deleting software');
      }

      toast.success('Software deleted successfully');
      mutate(`/api/software?page=${currentPage}&search=${searchTerm}`);
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.message);
    }
  };

  const handleEdit = (software) => {
    setEditingSoftware(software);
    setFormData({
      name: software.name,
      description: software.description,
      version: software.version,
      size: software.size,
      os: software.os,
      license: software.license,
      category: software.category._id,
      fileUrl: software.fileUrl,
      thumbnail: software.thumbnail
    });
    setIsModalOpen(true);
  };

  if (softwareError || categoriesError) {
    return <div>Error loading data</div>;
  }

  return (
    <AdminDashboard>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Software Management</h1>
          <button
            onClick={() => {
              setEditingSoftware(null);
              setFormData({
                name: '',
                description: '',
                version: '',
                size: '',
                os: [],
                license: '',
                category: '',
                fileUrl: '',
                thumbnail: ''
              });
              setIsModalOpen(true);
            }}
            className="btn btn-primary"
          >
            Add Software
          </button>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Version
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Downloads
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {software?.data?.map((item) => (
                    <tr key={item._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.category.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.version}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.downloads.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <h2 className="text-xl font-semibold mb-4">
                {editingSoftware ? 'Edit Software' : 'Add Software'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories?.data?.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    {editingSoftware ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminDashboard>
  );
} 