import { Navbar, NavbarBrand, NavbarToggle, NavbarCollapse, NavbarLink, Dropdown, Avatar, Button, DropdownItem } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { getToken, setToken } from '../utils/auth/token';

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    setIsAuthenticated(!!token);
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleLogout = () => {
    setToken('');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Navbar fluid rounded>
      <NavbarBrand className="pl-4">
        <Link to="/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-4 h-6 sm:h-9"
            alt="Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            MonApp
          </span>
        </Link>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <div onClick={toggleTheme} className="cursor-pointer mr-4">
          {darkMode ? <FaSun className="h-6 w-6 text-yellow-400" /> : <FaMoon className="h-6 w-6 text-gray-600 dark:text-white" />}
        </div>
        {!isAuthenticated ? (
          <NavbarLink>
            <Link to="/login">Connexion</Link>
          </NavbarLink>
        ) : (
          <Dropdown
            arrowIcon={false}
            inline
            className="pl-4"
            label={
              <Avatar
                alt="Avatar"
                img="https://minio.coak.fr/like-it-pp/f3b5a10aaefdad91fec29ae6dad5ff92.jpg"
                rounded
              />
            }
          >
            <DropdownItem onClick={handleLogout} className="text-red-600 dark:text-red-400">
              Déconnexion
            </DropdownItem>
          </Dropdown>
        )}
      </NavbarCollapse>
    </Navbar>
  );
}