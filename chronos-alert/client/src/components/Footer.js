import React from 'react';

const Footer = ({ tema }) => {
    const footerClasses = tema === 'dark'
        ? 'custom-headerFooter-dark'
        : 'custom-headerFooter-white';

    return (
        <footer className={`py-4 px-4 ${footerClasses} text-white`}>
            <div className="container text-center">
                <p>&copy; {new Date().getFullYear()} Felipe Diógenes.</p>
                <div className="mt-2 d-flex justify-content-center">
                    <a href="https://facebook.com" className="mx-2 text-white fs-5">
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href="https://twitter.com" className="mx-2 text-white fs-5">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://instagram.com" className="mx-2 text-white fs-5">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
