import React from 'react';

const TabelaResultados = () => {
    return (
        <div className="flex-grow-1 p-4 pb-0 d-flex flex-column">
            <div className="mb-2 pb-4">
                <div className="table-responsive">
                    <table className="table-light table-striped table-hover w-100 table shadow custom-border">
                        <thead>
                            <tr>
                                <th colSpan="7" className="text-center font-bold text-xl py-3">Status</th>
                            </tr>
                            <tr>
                                <th scope="col" className="col-12 col-md-2">Data/Hora</th>
                                <th scope="col" className="col-12 col-md-2">Processo</th>
                                <th scope="col" className="col-12 col-md-2 d-none d-md-table-cell">Juízo/Competência</th>
                                <th scope="col" className="col-12 col-md-2 d-none d-md-table-cell">Sala</th>
                                <th scope="col" className="col-12 col-md-2">Evento/Observação</th>
                                <th scope="col" className="col-12 col-md-1 d-none d-md-table-cell">Status</th>
                                <th scope="col" className="col-12 col-md-1">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="col-12 col-md-2">01/01/2024 10:00</td>
                                <td className="col-12 col-md-2">123456789</td>
                                <td className="col-12 col-md-2 d-none d-md-table-cell">Juízo X</td>
                                <td className="col-12 col-md-2 d-none d-md-table-cell">Sala 1</td>
                                <td className="col-12 col-md-2">Audiência de Custódia</td>
                                <td className="col-12 col-md-1 d-none d-md-table-cell">Agendada</td>
                                <td className="col-12 col-md-1">
                                    <button className="btn btn-copy">
                                        <i className="far fa-copy"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TabelaResultados;
