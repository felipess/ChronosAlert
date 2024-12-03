import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const TabelaResultados = ({ showPermissionWarning, resultadosPorStatus, isDarkMode, handleRequestPermission, aviso }) => {
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {copied ? 'Copiado!' : 'Copiar'}
        </Tooltip>
    );

    const [copied, setCopied] = React.useState(false);

    const handleCopy = (texto) => {
        navigator.clipboard.writeText(texto).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1000);
        });
    };

    return (
        <div className="flex-grow-1 p-4 pb-0 d-flex flex-column">
            <div>
                <h4 className="alert-heading text-center pb-2">Audiências de custódia</h4>
            </div>
            {resultadosPorStatus && Object.keys(resultadosPorStatus).sort().map((status) => (
                <div key={status} className="mb-2">
                    <div className="table-responsive">
                        <table className={`${isDarkMode ? 'table-dark' : 'table-light'} table-striped table-hover w-100 table shadow custom-border`}>
                            <thead>
                                <tr>
                                    <th colSpan="7" className="text-center font-bold text-xl py-3">{status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}{"s"}</th>
                                </tr>
                                <tr>
                                    <th scope="col" className="col-12 col-md-1">Data/Hora</th>
                                    <th scope="col" className="col-12 col-md-2">Processo</th>
                                    <th scope="col" className="col-12 col-md-3 d-none d-md-table-cell">Juízo/Competência</th>
                                    <th scope="col" className="col-12 col-md-2 d-none d-md-table-cell">Sala</th>
                                    <th scope="col" className="col-12 col-md-2">Evento/Observação</th>
                                    <th scope="col" className="col-12 col-md-1 d-none d-md-table-cell">Status</th>
                                    <th scope="col" className="col-12 col-md-1 text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultadosPorStatus[status].length > 0 ? (
                                    resultadosPorStatus[status].map((dado, index) => (
                                        <tr key={`${status}-${index}`}>
                                            <td className="col-12 col-md-1">{dado.dataHora}</td>
                                            <td className="col-12 col-md-2">{dado.processo}</td>
                                            <td className="col-12 col-md-3 d-none d-md-table-cell">{dado.juizo}</td>
                                            <td className="col-12 col-md-2 d-none d-md-table-cell">{dado.sala}</td>
                                            <td className="col-12 col-md-2">{dado.evento}</td>
                                            <td className="col-12 col-md-1 d-none d-md-table-cell">{dado.status}</td>
                                            <td className="col-12 col-md-1 text-center">
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={renderTooltip}
                                                >
                                                    <button
                                                        className="btn btn-primary btn-copy"
                                                        onClick={() => handleCopy(`${dado.evento} - ${dado.dataHora} - ${dado.processo} - ${dado.juizo} - ${dado.sala}`)}
                                                    >
                                                        <i className="far fa-copy"></i>
                                                    </button>
                                                </OverlayTrigger>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">Nenhum resultado disponível.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
            {showPermissionWarning && (
                <div className="alert alert-info">
                    <p>Para receber notificações sobre novos resultados, por favor, permita as notificações.</p>
                    <button onClick={handleRequestPermission} className="btn btn-primary">
                        Verificar permissões
                    </button>
                </div>
            )}
            {aviso.mensagem && (
                <div className={`alert ${isDarkMode ? 'alert-dark' : `alert-${aviso.tipo}`} alert-dismissible fade show`} role="alert">
                    {aviso.titulo && (
                        <h4 className="alert-heading">{aviso.titulo}</h4>
                    )}
                    <strong>{aviso.mensagem}</strong>
                    {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
                </div>
            )}
        </div>
    );
};

export default TabelaResultados;