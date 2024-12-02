import React, { createContext, useContext, useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';

// Criando o contexto
const UsuarioContext = createContext();

// Provedor do contexto
export const UsuarioProvider = ({ children }) => {

    const [usuario, setUsuario] = useState({
        nome: "",
        avatar: "",
    });

    const { keycloak } = useKeycloak();

    // Obtendo dados do usuário logado no Keycloak 
    useEffect(() => {
        if (keycloak?.authenticated) {
            const nome = keycloak.tokenParsed?.preferred_username || "Usuário";
            const avatar = "avatarMas.png";
            setUsuario({
                nome,
                avatar,
            });
        }
    }, [keycloak]);

    return (
        <UsuarioContext.Provider value={{ usuario, setUsuario }}>
            {children}
        </UsuarioContext.Provider>
    );
};

// Hook para consumir o contexto
export const useUsuario = () => useContext(UsuarioContext);
