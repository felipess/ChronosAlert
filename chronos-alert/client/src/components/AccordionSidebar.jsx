import React from 'react';
const AccordionSidebar = ({ handleAtualizar, isLoading, ultimaConsulta, proximaConsulta, dataInicio, dataFim }) => (
    <div className="accordion mt-2" id="accordionExample">

        {/* Âmbito da Pesquisa */}
        <div className="card">
            <div className="card-header" id="headingOne">
                <h5 className="mb-0">
                    <button
                        className="w-100 border-0 bg-transparent text-light fs-6"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                    >
                        <i className="bi bi-funnel" style={{ marginRight: '8px' }}></i>Âmbito
                    </button>
                </h5>
            </div>
            <div
                id="collapseOne"
                className="collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
            >
                <div className="card-body">
                    <span className="d-flex justify-content-center align-items-center"> Estadual</span>
                </div>
            </div>
        </div>

        {/* Período da Pesquisa */}
        <div className="card">
            <div className="card-header" id="headingTwo">
                <h5 className="mb-0">
                    <button
                        className="w-100 border-0 bg-transparent collapsed text-light fs-6"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                    >
                        <i className="bi bi-calendar-date" style={{ marginRight: '8px' }}></i>Período
                    </button>
                </h5>
            </div>
            <div
                id="collapseTwo"
                className="collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
            >
                <div className="card-body">
                    <span className="d-flex justify-content-center align-items-center">
                        {dataInicio} - {dataFim}
                    </span>
                </div>
            </div>
        </div>

        {/* Consultas */}
        <div className="card">
            <div className="card-header" id="headingThree">
                <h5 className="mb-0">
                    <button
                        className="w-100 border-0 bg-transparent collapsed text-light fs-6"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                    >
                        <i className="bi-alarm" style={{ marginRight: '8px' }}></i>Consultas
                    </button>
                </h5>
            </div>
            <div
                id="collapseThree"
                className="collapse show"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
            >
                <div className="card-body">
                    <div className="d-flex justify-content-center align-items-center">Última: {ultimaConsulta}</div>
                    <div className="d-flex justify-content-center align-items-center">Próxima: {proximaConsulta}</div>
                </div>
            </div>
        </div>

        {/* Botão para atualizar */}
        <div className="card">
            <button
                className="shadow btn btn-primary d-flex justify-content-center align-items-center"
                onClick={handleAtualizar}
                // disabled={isLoading}
                disabled={true}
                style={{ minWidth: '150px' }}
            >
                {isLoading ? (
                    <>
                        <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                        Carregando...
                    </>
                ) : (
                    <>
                        <i className="bi bi-arrow-repeat" style={{ marginRight: '8px' }}></i>
                        Atualizar
                    </>
                )}
            </button>
        </div>
    </div>
);

export default AccordionSidebar;
