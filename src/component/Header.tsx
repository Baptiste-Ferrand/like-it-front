import { Navbar, NavbarBrand, NavbarToggle, NavbarCollapse, NavbarLink } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getToken } from '../utils/auth/token';

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Navbar fluid rounded>
      <NavbarBrand>
        <Link to="/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            MonApp
          </span>
        </Link>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink>
          <Link to="/">Accueil</Link>
        </NavbarLink>
        {!isAuthenticated ? (
          <NavbarLink>
            <Link to="/login">Connexion</Link>
          </NavbarLink>
        ) : (
          <div className="ml-4">
            <img
              className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
              src="https://minio.coak.fr/like-it-pp/f3b5a10aaefdad91fec29ae6dad5ff92.jpg"
              alt="Avatar"
            />
          </div>
        )}
      </NavbarCollapse>
    </Navbar>
  );
}