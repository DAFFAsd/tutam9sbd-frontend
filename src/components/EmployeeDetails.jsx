import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import employeeIcon from '../assets/employee.svg';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    division: '',
    salary: '',
    address: '',
  });

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/employee/${id}`);
        setEmployee(response.data);
        setFormData({
          name: response.data.name,
          division: response.data.division,
          salary: response.data.salary,
          address: response.data.address,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee details:', error);
        setError('Failed to fetch employee details');
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/employee/${id}`, formData);
      setEmployee({ ...employee, ...formData });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating employee details:', error);
      setError('Failed to update employee details');
    }
  };

  if (loading) return <LoadingSkeleton />;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center min-h-screen w-full px-5 sm:px-0 bg-gradient-to-br from-slate-900 to-zinc-900 pt-6">
      <button
        onClick={() => navigate(-1)} 
        className="mt-4 font-poppins font-medium text-purple-600 hover:text-purple-400 transition-colors duration-200"
      >
        <i className="fas fa-arrow-left"></i> Back
      </button>

      {employee && (
        <div className="flex bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg overflow-hidden max-w-xs lg:max-w-sm w-full relative mt-6 mb-6">
          <div className="hidden md:block bg-cover" style={{ backgroundImage: `url(https://source.unsplash.com/1L71sPT5XKc)`, backgroundSize: 'cover' }}></div>
          <div className="w-full p-4 font-poppins text-gray-200">
            <div className="flex flex-col items-center justify-center w-full lg:pt-4">
              <div className="text-center text-xl font-medium text-purple-400 mb-4">
              🧑🏿‍🌾 Details
              </div>
              <img src={employeeIcon} className="rounded-full shadow-xl h-32 w-32 bg-cover bg-center" alt="Profile Icon" />
            </div>
            {isEditing ? (
              <div>
                <label className="block text-gray-300 font-medium mb-2" htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full p-2 mb-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
                />
                <label className="block text-gray-300 font-medium mb-2" htmlFor="division">Division</label>
                <input
                  id="division"
                  type="text"
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  className="block w-full p-2 mb-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
                />
                <label className="block text-gray-300 font-medium mb-2" htmlFor="salary">Salary</label>
                <input
                  id="salary"
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="block w-full p-2 mb-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
                />
                <label className="block text-gray-300 font-medium mb-2" htmlFor="address">Address</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="block w-full p-2 mb-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
                />
                <button
                  onClick={handleSave}
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-500 transition-colors duration-200"
                >
                  Save
                </button>
                <button
                  onClick={handleEditToggle}
                  className="w-full bg-red-600 text-white py-2 mt-2 rounded-lg hover:bg-red-500 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold pt-4 text-center">{employee.name}</h1>
                <div className="mx-auto lg:mx-0 w-full pt-3 border-b-2 border-purple-600 opacity-25"></div>
                <div className="pt-2 text-gray-200 text-base lg:text-sm flex flex-col items-center">
                  <p className="font-bold flex items-center mb-2">
                    <i className="fas fa-building h-4 text-purple-600 pr-2"></i>
                    Division:
                  </p>
                  <p className="pl-2 font-normal">{employee.division}</p>
                </div>
                <div className="pt-2 text-gray-200 text-base lg:text-sm flex flex-col items-center">
                  <p className="font-bold flex items-center mb-2">
                    <i className="fas fa-dollar-sign h-4 text-purple-600 pr-2"></i>
                    Salary:
                  </p>
                  <p className="pl-2 font-normal">Rp {employee.salary}</p>
                </div>
                <div className="pt-2 text-gray-200 text-base lg:text-sm flex flex-col items-center">
                  <p className="font-bold flex items-center mb-2">
                    <i className="fas fa-map-marker-alt h-4 text-purple-600 pr-2"></i>
                    Address:
                  </p>
                  <p className="pl-2 font-normal">{employee.address}</p>
                </div>
                <button
                  onClick={handleEditToggle}
                  className="w-full bg-purple-600 text-white py-2 mt-4 rounded-lg hover:bg-purple-500 transition-colors duration-200"
                >
                  Edit 🧑🏿‍🌾 Details
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="flex items-center justify-center min-h-screen w-full px-5 sm:px-0 bg-gradient-to-br from-slate-900 to-zinc-900">
    <div className="flex bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg overflow-hidden max-w-xs lg:max-w-sm w-full relative">
      <div className="w-full p-4 font-poppins text-gray-200">
        <div className="animate-pulse">
          <div className="h-32 w-32 bg-gray-700 rounded-full mb-4 mx-auto"></div>
          <div className="bg-gray-700 h-6 w-3/4 mx-auto rounded mb-4"></div>
          <div className="bg-gray-700 h-6 w-1/2 mx-auto rounded mb-4"></div>
          <div className="bg-gray-700 h-6 w-1/2 mx-auto rounded mb-4"></div>
          <div className="bg-gray-700 h-6 w-1/2 mx-auto rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

export default EmployeeDetails;
