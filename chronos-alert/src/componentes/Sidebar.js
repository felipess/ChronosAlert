import React from 'react';
import AccordionSidebar from './AccordionSidebar';
import PostItManager from './PostItManager';

const Sidebar = () => {
    return (
        <div className="p-3 sidebar text-dark border-end" style={{ width: '260px' }}>

            <button className="shadow-sm btn mt-0 btn-primary">
                <i className="fas fa-bars"></i>
            </button>
            <AccordionSidebar />
            <PostItManager />
        </div>
    );
};

export default Sidebar;
