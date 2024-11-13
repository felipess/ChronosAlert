import React from 'react';
import AccordionSidebar from './AccordionSidebar';

const Sidebar = () => {
    return (
        <div className="p-3 sidebar border-end" style={{ width: '260px' }}>
            <AccordionSidebar />
        </div>
    );
};

export default Sidebar;
