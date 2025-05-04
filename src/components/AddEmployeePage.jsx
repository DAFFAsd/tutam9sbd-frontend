import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ngumpulImage from '../assets/ngumpul.png'; 
import './transisi.css'; 

export default function AddEmployeePage() {
  const [name, setName] = useState("");
  const [division, setDivision] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [fadeIn, setFadeIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleAddEmployee = async () => {
    if (!name || !division || !salary || !address) {
      setError("Please fill in all fields");
      return;
    }
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/employee/add`, {
        name,
        division,
        salary,
        address,
      });
  
      if (response.status !== 201) throw new Error("Add 🧑🏿‍🌾 failed");
  
      console.log(response.data);
      navigate('/success');
  
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        setError("A 🧑🏿‍🌾 with this name already exists");
      } else {
        setError("Failed to add 🧑🏿‍🌾");
      }
    }
  }
  

  return (
    <div className={`flex items-center justify-center h-screen w-full px-5 sm:px-0 bg-gradient-to-br from-slate-900 to-zinc-900 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`flex bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg overflow-hidden max-w-sm lg:max-w-4xl w-full transition-transform duration-1000 ${fadeIn ? 'transform scale-100' : 'transform scale-95'}`}>
        <div
          className="hidden md:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage: `url(${ngumpulImage})`,
            backgroundSize: 'cover',
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2 font-poppins">
          <p className="text-xl text-gray-200 text-center">Add A New 🧑🏿‍🌾 Details Here</p>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="mt-4">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-gray-200 border border-gray-600 rounded py-2 px-4 block w-full bg-gray-800 focus:outline-2 focus:outline-blue-500"
              type="text"
              required
            />
          </div>
          <div className="mt-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Division
              </label>
            </div>
            <input
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="text-gray-200 border border-gray-600 rounded py-2 px-4 block w-full bg-gray-800 focus:outline-2 focus:outline-blue-500"
              type="text"
            />
          </div>
          <div className="mt-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Salary (IDR)
              </label>
            </div>
            <input
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="text-gray-200 border border-gray-600 rounded py-2 px-4 block w-full bg-gray-800 focus:outline-2 focus:outline-blue-500"
              type="number"
            />
          </div>
          <div className="mt-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Address
              </label>
            </div>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="text-gray-200 border border-gray-600 rounded py-2 px-4 block w-full bg-gray-800 focus:outline-2 focus:outline-blue-500"
              type="text"
            />
          </div>
          <div className="mt-8">
            <button className="bg-purple-600 text-gray-200 font-bold py-2 px-4 w-full rounded hover:bg-purple-700" onClick={handleAddEmployee}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
