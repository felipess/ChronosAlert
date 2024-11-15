import React from 'react';

const Header = ({ tema, toggleTema }) => {
    const headerClasses = tema === 'dark'
        ? 'custom-headerFooter-dark header '
        : 'custom-headerFooter-white header ';

    return (
        <header className={`py-4 ${headerClasses}`}>
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <h2 className="font-weight-bold">
                        <a href="/" className={`mx-2 ${headerClasses} text-decoration-none`}>
                            <i className="px-4 bi bi-fingerprint" style={{ marginRight: '16px' }}></i>
                            Audiências de custódia
                        </a>
                    </h2>
                </div>
                <div className="d-flex align-items-center">
                    <i
                        style={{ position: 'relative' }}
                        className="btn"
                    >
                        <i className="bi bi-bell"></i>
                    </i>
                    <div className="px-4"></div>
                    <i className="btn">
                        <i onClick={toggleTema} className={`bi pr-2 ${tema === 'light' ? 'bi-moon' : 'bi-sun'}`}></i>
                    </i>

                    {/* Avatar e Nome do Usuário */}
                    <div className="user-info d-flex align-items-center ms-4">
                        <div src="#" alt="Img" className="rounded-circle fakeuser" style={{ width: '40px', height: '40px', objectFit: 'cover' }}>foto</div>
                        <span className="ms-2 me-4">Usuário</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
