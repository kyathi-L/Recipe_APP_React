import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar({ onDelete, selectedRecipeId }) {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Hide button when sidebar is open */}
      {!isOpen && (
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
      )}

      {/* Sidebar */}
      <div ref={sidebarRef} className={`sidebar ${isOpen ? 'visible' : ''}`}>
        <div className="sidebar-header">
          <NavLink to="/" className="sidebar-brand">
            Recipe App 🫕
          </NavLink>
        </div>
        <ul className="sidebar-menu">
          <li>
            <NavLink className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`} to="/create">
              Create Recipe
            </NavLink>
          </li>
          {selectedRecipeId && (
            <li>
              <NavLink className="menu-item danger" to={`/delete/${selectedRecipeId}`} onClick={() => onDelete(selectedRecipeId)}>
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
