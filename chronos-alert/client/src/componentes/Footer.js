import React from 'react';

const Footer = () => {
    return (
        <footer className="py-4 px-4 footer text-white">
            <div className="container text-center">
                <p>&copy; {new Date().getFullYear()} - Felipe Diogenes.</p>
                <div className="mt-2">
                    <a href="https://facebook.com" className="mx-2 text-white"><i className="fab fa-facebook"></i></a>
                    <a href="https://twitter.com" className="mx-2 text-white"><i className="fab fa-twitter"></i></a>
                    <a href="https://instagram.com" className="mx-2 text-white"><i className="fab fa-instagram"></i></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
