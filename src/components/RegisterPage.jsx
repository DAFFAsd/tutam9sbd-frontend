import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import registrasi from '../assets/registrasi.png'; 
import './transisi.css'; 

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [fadeIn, setFadeIn] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setFadeIn(true);
    }, []);

    const handleRegister = async () => {
        if (!email || !username || !password || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        }
    
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
    
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}manager/register`, {
                email,
                username,
                password,
            });
    
            if (response.status !== 201) throw new Error("Register failed");
    
            console.log(response.data);
            navigate('/register-success');
    
        } catch (error) {
            
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError("Failed to register user");
            }
        }
    };
    
    return (
        <div className={`flex items-center justify-center h-screen w-full px-5 sm:px-0 bg-gradient-to-br from-slate-900 to-zinc-900 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`flex bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg overflow-hidden max-w-sm lg:max-w-4xl w-full transition-transform duration-1000 ${fadeIn ? 'transform scale-100' : 'transform scale-95'}`}>
                <div
                    className="hidden md:block lg:w-1/2 bg-cover"
                    style={{
                        backgroundImage: `url(${registrasi})`,
                        backgroundSize: 'cover',
                    }}
                ></div>
                <div className="w-full p-8 lg:w-1/2 font-poppins">
                    <p className="text-xl text-gray-200 text-center">Let's Create A New Account!</p>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <div className="mt-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2">Email Address</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="text-gray-200 border border-gray-600 rounded py-2 px-4 block w-full bg-gray-800 focus:outline-2 focus:outline-blue-500"
                            type="email"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2">Username</label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="text-gray-200 border border-gray-600 rounded py-2 px-4 block w-full bg-gray-800 focus:outline-2 focus:outline-blue-500"
                            type="text"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="text-gray-200 border border-gray-600 rounded py-2 px-4 block w-full bg-gray-800 focus:outline-2 focus:outline-blue-500"
                            type="password"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2">Confirm Password</label>
                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="text-gray-200 border border-gray-600 rounded py-2 px-4 block w-full bg-gray-800 focus:outline-2 focus:outline-blue-500"
                            type="password"
                            required
                        />
                    </div>
                    <div className="mt-8">
                        <button
                            type="button"
                            className="bg-purple-600 text-gray-200 font-bold py-2 px-4 w-full rounded hover:bg-purple-700"
                            onClick={handleRegister}
                        >
                            Register
                        </button>
                    </div>
                    <div className="mt-4 flex items-center w-full text-center">
                        <span
                            className="text-xs text-gray-400 capitalize text-center w-full cursor-pointer"
                            onClick={() => navigate("/login")}
                        >
                            Already have an account? <span className="text-blue-400">Login</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
