import React from 'react';

const AccordionSidebar = () => (
    <div className="accordion mt-2" id="accordionExample">
        <div className="card">
            <div className="card-header" id="headingOne">
                <h5 className="mb-0">
                    <button
                        className="w-100 border-0 bg-transparent collapsed text-light fs-6"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                    >
                        Âmbito
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
                        Período
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
                        dd/mm/aaaa - dd/mm/aaaa
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
                        Consultas
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
                    <div className="d-flex justify-content-center align-items-center">Última: dd/mm/aaaa</div>
                    <div className="d-flex justify-content-center align-items-center">Próxima: dd/mm/aaaa</div>
                </div>
            </div>
        </div>

    </div>
);

export default AccordionSidebar;
