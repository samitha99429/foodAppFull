import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/navbar.css';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');

    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbarlogo">
        <span className="logotext">cook</span>
      </div>
      <div className="navbar-links">
        <Link to="/homepage" className="nav-link">HOME</Link>
        <Link to="/favorites" className="nav-link">FAVOURITE</Link>
      </div>
      <div >
   
          <svg
             onClick={handleLogout}
            fill="#000000"
            xmlns="http://www.w3.org/2000/svg"
             width="24px"
            height="24px"
            viewBox="0 0 52 52"
            enable-background="new 0 0 52 52"
            xmlSpace="preserve"
          >
            <g>
              <path d="M21,48.5v-3c0-0.8-0.7-1.5-1.5-1.5h-10C8.7,44,8,43.3,8,42.5v-33C8,8.7,8.7,8,9.5,8h10C20.3,8,21,7.3,21,6.5v-3 C21,2.7,20.3,2,19.5,2H6C3.8,2,2,3.8,2,6v40c0,2.2,1.8,4,4,4h13.5C20.3,50,21,49.3,21,48.5z" />
              <path d="M49.6,27c0.6-0.6,0.6-1.5,0-2.1L36.1,11.4c-0.6-0.6-1.5-0.6-2.1,0l-2.1,2.1c-0.6,0.6-0.6,1.5,0,2.1l5.6,5.6 c0.6,0.6,0.2,1.7-0.7,1.7H15.5c-0.8,0-1.5,0.6-1.5,1.4v3c0,0.8,0.7,1.6,1.5,1.6h21.2c0.9,0,1.3,1.1,0.7,1.7l-5.6,5.6 c-0.6,0.6-0.6,1.5,0,2.1l2.1,2.1c0.6,0.6,1.5,0.6,2.1,0L49.6,27z" />
            </g>
          </svg>
        
     
      </div>
    </nav>
  );
};

export default NavBar;
