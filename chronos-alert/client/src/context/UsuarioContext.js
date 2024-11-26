import React, { createContext, useContext, useState } from 'react';

// Criando o contexto
const UsuarioContext = createContext();

// Provedor do contexto 
export const UsuarioProvider = ({ children }) => {
    const [usuario, setUsuario] = useState({
        nome: "Felipe", //dados estáticos até integração com Keycloak
        avatar: "avatarMas.png" //dados estáticos até integração com Keycloak
    });

    return (
        <UsuarioContext.Provider value={{ usuario, setUsuario }}>
            {children}
        </UsuarioContext.Provider>
    );
};

// Hook para consumir o contexto
export const useUsuario = () => useContext(UsuarioContext);