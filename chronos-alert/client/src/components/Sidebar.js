import React from 'react';
import AccordionSidebar from './AccordionSidebar';
import PostItManager from './PostItManager';

const Sidebar = ({ isMenuCollapsed, toggleMenu, ultimaConsulta, proximaConsulta,
    dataInicio, dataFim, isDarkMode, handleAtualizar, isLoading }) => {

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
                <AccordionSidebar
                    ultimaConsulta={ultimaConsulta}
                    proximaConsulta={proximaConsulta}
                    dataInicio={dataInicio}
                    dataFim={dataFim}
                    handleAtualizar={handleAtualizar}
                    isLoading={isLoading}
                />
            )}
            {!isMenuCollapsed && (
                <PostItManager />
            )}
        </div >
    );
};

export default Sidebar;
