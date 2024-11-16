<!-- https://structurizr.com/dsl -->

workspace "Sistema Web" "Descrição do sistema web com React, Node.js e MongoDB" {

    !identifiers hierarchical

    model {
        // Definindo o usuário (com descrição detalhada)
        u = person "Usuário" {
            description "Interage com o front-end da aplicação web."
            tags "person"
        }

        // Definindo o sistema webApp e seus containers
        wa = softwareSystem "Aplicação Web" {
            reactApp = container "Aplicação Frontend" {
                technology "React, Bootstrap"
                description "Interage com a API Backend para obter dados."
                tags "Frontend, Web"
            }
            apiBackend = container "API Backend" {
                technology "Node.js, Express"
                description "API RESTful. Fornece endpoints para o frontend e comunica com o banco de dados."
                tags "Backend, API"
                authComponent = component "Autenticação" {
                    technology "JWT, Keycloak"
                    description "Módulo responsável pela autenticação dos usuários, integrando com o Keycloak."
                    tags "Component"
                }
            }
            db = container "Banco de Dados" {
                technology "MongoDB"
                description "Persistência dos Dados."
                tags "Database"
            }
            puppeteerScript = container "Script de Web Scraping" {
                technology "Puppeteer, Node.JS"
                description "Coleta de dados na web."
                tags "Scraping"
            }
        }
        
        // Definindo o Keycloak como um sistema de software, mas com foco em sistema externo
        keycloak = softwareSystem "Keycloak" {
            description "Sistema de gerenciamento de identidade e autenticação utilizado para autenticar os usuários."
            tags "External, Identity"
        }

        // Relacionamentos entre o Usuário e o Sistema Web
        u -> wa.reactApp "Usa"
        
        // Relacionamentos entre o Frontend, Backend e Banco de Dados
        wa.reactApp -> wa.apiBackend "Chama API"
        wa.apiBackend -> wa.db "Consulta/Armazena dados"

        // Relacionamentos entre o Sistema de Web Scraping e o Banco de Dados
        wa.puppeteerScript -> wa.db "Armazena dados no banco"
        
        // Relacionamento entre o Backend e o Keycloak (Sistema de Autenticação)
        wa.apiBackend -> keycloak "Autentica com"
    }

    views {

        // Definindo o estilo para os containers e componentes
        styles {
            element "person" {
                background "#5456d6"
                color "#ffffff"
                shape "person"
                fontSize 24
            }
            element "Frontend" {
                background "#f0f8ff"
                color "#0000ff"
                shape "Window"
                fontSize 24
            }
            element "Backend" {
                background "#eeeeee"
                color "#0000ff"
                shape "Hexagon"
                fontSize 24
            }
            element "Database" {
                background "#32a852"
                color "#ffffff"
                shape "Cylinder"
                fontSize 24
            }
            element "Scraping" {
                background "#f2ea07"
                color "#000000"
                shape "Robot"
                fontSize 24
            }
            element "External" {
                background "#d3d3d3"
                color "#000000"
                shape "Hexagon"
                fontSize 24
            }
        }
    }
}
