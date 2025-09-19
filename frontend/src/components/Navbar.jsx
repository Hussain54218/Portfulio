import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { 
  FaHome, 
  FaUser, 
  FaFolder, 
  FaLightbulb, 
  FaEnvelope, 
  FaCog, 
  FaCode,
  FaBars,
  FaTimes
} from "react-icons/fa";

function Navbar() {
  const { user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-purple-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 flex items-center space-x-2 transition-transform hover:scale-105"
            onClick={closeMenu}
          >
            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text text-2xl font-bold">
              MyPortfolio
            </div>
            <span className="text-cyan-400 text-xl">
              <FaCode />
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" icon={<FaHome />} onClick={closeMenu}>Home</NavLink>
            <NavLink to="/about" icon={<FaUser />} onClick={closeMenu}>About</NavLink>
            <NavLink to="/projects" icon={<FaFolder />} onClick={closeMenu}>Projects</NavLink>
            <NavLink to="/skills" icon={<FaLightbulb />} onClick={closeMenu}>Skills</NavLink>
            <NavLink to="/contact" icon={<FaEnvelope />} onClick={closeMenu}>Contact</NavLink>
            <NavLink to="/admin" icon={<FaEnvelope />} onClick={closeMenu}>SignIn</NavLink>

            {user && user.role === "admin" && (
              <Link
                to="/admin"
                onClick={closeMenu}
                className="flex items-center space-x-1 text-red-300 hover:text-red-100 font-semibold transition-colors px-3 py-2 rounded-lg bg-red-900/20 hover:bg-red-900/30"
              >
                <FaCog />
                <span>Admin</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none p-2 rounded-md hover:bg-blue-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className="text-xl w-6 h-6" />
              ) : (
                <FaBars className="text-xl w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="px-2 pt-2 pb-4 space-y-1 bg-blue-900 rounded-lg mt-2">
            <MobileNavLink to="/" icon={<FaHome />} onClick={closeMenu}>Home</MobileNavLink>
            <MobileNavLink to="/about" icon={<FaUser />} onClick={closeMenu}>About</MobileNavLink>
            <MobileNavLink to="/projects" icon={<FaFolder />} onClick={closeMenu}>Projects</MobileNavLink>
            <MobileNavLink to="/skills" icon={<FaLightbulb />} onClick={closeMenu}>Skills</MobileNavLink>
            <MobileNavLink to="/contact" icon={<FaEnvelope />} onClick={closeMenu}>Contact</MobileNavLink>
            <MobileNavLink to="/admin" icon={<FaEnvelope />} onClick={closeMenu}>SignIn</MobileNavLink>

            {user && user.role === "admin" && (
              <MobileNavLink to="/admin" icon={<FaCog />} onClick={closeMenu} isAdmin={true}>
                Admin Panel
              </MobileNavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

// Component for desktop navigation links
function NavLink({ to, icon, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center space-x-1 text-blue-100 hover:text-white transition-colors relative group px-3 py-2 rounded-lg hover:bg-blue-800/50"
    >
      <span className="w-5 flex justify-center">{icon}</span>
      <span className="font-medium">{children}</span>
      <span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-cyan-400 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
    </Link>
  );
}

// Component for mobile navigation links
function MobileNavLink({ to, icon, children, onClick, isAdmin = false }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
        isAdmin 
          ? 'text-red-200 hover:text-red-100 hover:bg-red-900/30' 
          : 'text-blue-100 hover:text-white hover:bg-blue-800'
      }`}
    >
      <span className={`w-5 flex justify-center ${isAdmin ? 'text-red-300' : 'text-cyan-300'}`}>
        {icon}
      </span>
      <span className="font-medium">{children}</span>
    </Link>
  );
}

export default Navbar;