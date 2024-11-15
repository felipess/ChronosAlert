// Sidebar.js
import React from 'react';
import AccordionSidebar from './AccordionSidebar';
import PostItManager from './PostItManager';

const Sidebar = ({ isMenuCollapsed, toggleMenu, isDarkMode }) => {

    return (
        <div className={`p-3 sidebar ${isMenuCollapsed ? 'collapsed' : 'expanded'} ${isDarkMode ? 'text-light' : 'text-dark'} border-end`} style={{ width: isMenuCollapsed ? '80px' : '260px' }}>

            <button onClick={toggleMenu} className={`shadow-sm btn mt-0 ${isMenuCollapsed ? 'btn-secondary' : 'btn-primary'}`}>
                {isMenuCollapsed ? (
                    <i className="fas fa-bars"></i>
                ) : (
                    <i className="fas fa-chevron-left"></i>
                )}
            </button>

            {!isMenuCollapsed && (
                <AccordionSidebar />
            )}

            {!isMenuCollapsed && (
                <PostItManager />
            )}

        </div >
    );
};

export default Sidebar;
