import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  const fetchEmployees = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}employee/get`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setError('Failed to fetch employees');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setSortConfig({ key: 'id', direction: 'asc' });
    }
  }, [data]);

  useEffect(() => {
    let sortedData = [...data];
    if (sortConfig !== null) {
      sortedData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    setFilteredData(sortedData);
  }, [sortConfig, data]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(employee =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}employee/${id}`);
      setData(data.filter(employee => employee.id !== id));
      setFilteredData(filteredData.filter(employee => employee.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
      setError('Failed to delete employee');
    }
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-lg mx-auto mb-12">
      <header className="text-center my-6">
        <h2 className="text-2xl text-gray-900 dark:text-white">
          Current 🧑🏿‍🌾 List
        </h2>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full p-2 mt-4 mb-6 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
        />
      </header>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer"
              onClick={() => requestSort('id')}
            >
              ID {sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer"
              onClick={() => requestSort('name')}
            >
              Name {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((employee, index) => (
            <tr
              key={employee.id}
              className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${
                index % 2 === 0 ? '' : 'bg-gray-100'
              }`}
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                E{employee.id}
              </td>
              <td className="px-6 py-4">{employee.name}</td>
              <td className="px-6 py-4 text-right flex space-x-2">
                <Link
                  to={`/employee-details/${employee.id}`}
                  className="text-xs font-medium text-purple-600 dark:text-purple-500 hover:underline"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleDelete(employee.id)}
                  className="text-xs font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
