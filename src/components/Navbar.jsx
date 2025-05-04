import { useLocation, useNavigate } from "react-router-dom";
import { close, logo, menu } from "../assets";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const [navLinks, setNavLinks] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('ActiveEmail');
    
    if (email) {
      setNavLinks([
        { id: "home", title: "Home" },
        { id: "add-employee", title: "Add 🧑🏿‍🌾" },
        { id: "my-info", title: "My Info" },
        { id: "sign-out", title: "Sign Out" },
      ]);
    } else {
      setNavLinks([
        { id: "home", title: "Home" },
        { id: "login", title: "Login" },
        { id: "register", title: "Register" },
      ]);
    }
  }, [location]);

  const handleNavigation = (title, id) => {
    if (id === "sign-out") {
      setShowConfirmDialog(true);
    } else {
      navigate(`/${id}`, { state: { active: title } });
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('ActiveEmail');
    setShowConfirmDialog(false);
    navigate('/login');
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
  };

  const isActive = (id) => location.pathname === `/${id}`;

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar fill">
      <div className="flex items-center gap-4">
        <img 
          src="https://em-content.zobj.net/source/microsoft-teams/363/farmer-dark-skin-tone_1f9d1-1f3ff-200d-1f33e.png" 
          alt="Farmer" 
          className="w-[48px] h-[48px]" 
        />
        <span className="font-kumbh-sans text-white text-xl font-semibold">*****Database</span>
      </div>

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              isActive(nav.id) ? "text-white" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
          >
            <a
              onClick={() => handleNavigation(nav.title, nav.id)}
              className={`relative inline-block ${
                isActive(nav.id) ? "font-bold" : ""
              }`}
            >
              {nav.title === "Register" || nav.id === "register" ? (
                <span
                  className={`px-4 py-2 rounded-full ${
                    isActive(nav.id) ? "bg-purple-700 text-white" : "bg-purple-500 text-dimWhite"
                  }`}
                >
                  {nav.title}
                </span>
              ) : (
                nav.title
              )}
            </a>
          </li>
        ))}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  isActive(nav.id) ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
              >
                <a
                  onClick={() => handleNavigation(nav.title, nav.id)}
                  className={`relative inline-block ${
                    isActive(nav.id) ? "font-bold" : ""
                  }`}
                >
                  {nav.title === "Register" || nav.id === "register" ? (
                    <span
                      className={`px-4 py-2 rounded-full ${
                        isActive(nav.id) ? "bg-purple-700 text-white" : "bg-purple-500 text-dimWhite"
                      }`}
                    >
                      {nav.title}
                    </span>
                  ) : (
                    nav.title
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showConfirmDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 confirm-dialog">
          <div className="font-poppins bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-lg shadow-lg text-center">
            <p className="text-white text-lg mb-4">Are you sure you want to sign out?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleSignOut}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300"
              >
                Sign Out
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
