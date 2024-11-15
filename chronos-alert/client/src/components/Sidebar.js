import React from 'react';
import AccordionSidebar from './AccordionSidebar';
import PostItManager from './PostItManager';

const Sidebar = () => {
    return (
        <div className="p-3 sidebar border-end" style={{ width: '260px' }}>
            <AccordionSidebar />
            <PostItManager />
        </div>
    );
};

export default Sidebar;
