import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar({ onDelete, selectedRecipeId }) {
  const [isOpen, setIsOpen] = useState(false); // Sidebar state: open/closed

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle sidebar open/close
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        className={`sidebar-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'visible' : ''}`}>
        <div className="sidebar-header">
          <NavLink to="/" className="sidebar-brand">
            Recipe App🫕
          </NavLink>
        </div>
        <ul className="sidebar-menu">
          {/* Home Link */}
          <li>
            <NavLink
              className={({ isActive }) =>
                `menu-item ${isActive ? 'active' : ''}`
              }
              to="/"
            >
              Home
            </NavLink>
          </li>

          {/* Create Recipe Link */}
          <li>
            <NavLink
              className={({ isActive }) =>
                `menu-item ${isActive ? 'active' : ''}`
              }
              to="/create"
            >
              Create Recipe
            </NavLink>
          </li>

          

          {/* Conditional Delete Link */}
          {selectedRecipeId && (
            <li>
              <NavLink
                className="menu-item danger"
                to={`/delete/${selectedRecipeId}`}
                onClick={() => onDelete(selectedRecipeId)}
              >
                Delete Recipe
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
