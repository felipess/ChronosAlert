import React from 'react';

const Header = () => {
    return (
        <header className="py-4 custom-headerFooter-dark header">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <h2 className="font-weight-bold">
                        <a href="/" className="mx-2 custom-headerFooter-dark header text-decoration-none">
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
                        <i className="bi pr-2 bi-sun"></i>
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
