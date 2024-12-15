import React, { useState, useEffect } from 'react';
import { useUsuario } from '../context/UsuarioContext';
import { sendNotification } from '../utils/notification';
import LogoutButton from './Logout';


const Header = ({ tema, toggleTema, notifications }) => {
    const [showNotifications, setShowNotifications] = useState(false);

    const headerClasses = tema === 'dark'
        ? 'custom-headerFooter-dark header '
        : 'custom-headerFooter-white header ';

    const { usuario } = useUsuario(); // Acessando o usuario do contexto

    // Filtrar notificações excluindo status "REALIZADA"
    const filteredNotifications = notifications.filter(notif =>
        notif.resultado && Array.isArray(notif.resultado.dados) &&
        notif.resultado.dados.length > 0 &&
        notif.resultado.dados[notif.resultado.dados.length - 1] !== "REALIZADA"
    );

    const getTimeAgo = (dateString) => {
        const now = new Date();
        const notificationDate = new Date(dateString);
        const diffInSeconds = Math.floor((now - notificationDate) / 1000);

        if (diffInSeconds < 60) {
            return `${diffInSeconds} segundo(s) atrás`;
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} minuto(s) atrás`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} hora(s) atrás`;
        } else {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} dia(s) atrás`;
        }
    };

    useEffect(() => {
        if (filteredNotifications.length > 0) {
            sendNotification(filteredNotifications);
        }
    }, [filteredNotifications]);

    return (
        <header className={`py-4 ${headerClasses}`}>
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <h2 className="font-weight-bold">
                        <a href="/" className={`mx-2 ${headerClasses} text-decoration-none`}>
                            <i className="px-4 bi bi-fingerprint" style={{ marginRight: '16px' }}></i>
                            **Chronos**{/* Audiências de custódia */}
                        </a>
                    </h2>
                </div>
                <div className="d-flex align-items-center">
                    <button
                        onClick={() => setShowNotifications(prev => !prev)}
                        style={{ position: 'relative' }}
                        className="btn"
                    >
                        <i className={"bi bi-bell"}></i>
                        {filteredNotifications.length > 0 && (
                            <span className="notification-badge bg-danger rounded-circle">
                                {filteredNotifications.length}
                            </span>
                        )}
                    </button>

                    {/* Espaçamento entre icones*/}
                    <div className='px-2'></div>

                    <button className="btn">
                        <i onClick={toggleTema} className={`bi pr-2 ${tema === 'light' ? 'bi-moon' : 'bi-sun'}`}></i>
                    </button>

                    {/* Espaço do Avatar e Nome do Usuário */}
                    <div className="user-info">
                        {usuario.avatar ? (
                            <img
                                src={usuario.avatar}
                                alt="Img"
                                className="user-avatar"
                            />
                        ) : (
                            <div className="avatar-placeholder">
                                <i className="bi bi-person-circle"></i>
                            </div>
                        )}
                        <span className="user-name">{usuario.nome}</span>
                    </div>


                    {/* Componente de Logout */}
                    <LogoutButton />
                </div>
            </div>
            {showNotifications && (
                <div className="notifications-dropdown">
                    {filteredNotifications.length > 0 ? (
                        <>
                            {filteredNotifications.slice().reverse().map((notif, index) => (
                                <div key={index} className="notification-item">
                                    <div className="row">
                                        <div className="col-sm-2 d-flex align-items-center justify-content-center">
                                            <i className="bi bi-exclamation-triangle"></i>
                                        </div>
                                        <div className="col-sm-10">
                                            <div>
                                                {notif.resultado && Array.isArray(notif.resultado.dados) ? (
                                                    <>
                                                        {/* Formatar e exibir os dados */}
                                                        {notif.resultado.dados.length > 0 && (
                                                            <>
                                                                <span className="notification-date">{notif.resultado.dados[0]}</span> -
                                                                <span className="notification-processo">{" "}{notif.resultado.dados[1]}</span> -
                                                                <span className="notification-juizo">{" "}{notif.resultado.dados[2]}</span> -
                                                                <span className="notification-status">{" "}({notif.resultado.dados[5]})</span>
                                                            </>
                                                        )}

                                                        {/* Calcular e exibir o tempo passado desde a notificação */}
                                                        <div className="pt-2 text-end">
                                                            {`${getTimeAgo(notif.data)}`}
                                                        </div>
                                                    </>
                                                ) : (
                                                    'Notificação sem resultado'
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="notification-item">
                            <strong>Nenhuma notificação disponível.</strong>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
