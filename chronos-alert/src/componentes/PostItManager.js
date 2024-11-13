import React from 'react';

const PostItManager = () => {
    return (
        <div className='pt-6'>
            <span className="postit-controls mb-3 fs-5 ps-2">Post-its
                <i className="bi bi-plus-circle px-3 fs-4" style={{ cursor: 'pointer' }}></i>
            </span>

            {/* Editor de Post-it */}
            <div className="postit-editor">
                <textarea
                    maxLength={99}
                    placeholder="Exemplo: 5023311-86.2024.4.04.7002 - Procurador XYZ ciente"
                    wrap="soft"
                    style={{ resize: "none", padding: "5px" }}
                />
                <div className="postit-controls d-flex justify-content-end">
                    <div className='pe-2'>
                        <button type="button" className="btn btn-secondary">Cancelar</button>
                    </div>
                    <div>
                        <button type="button" className="btn btn-primary">Adicionar</button>
                    </div>
                </div>
            </div>

            {/* Lista de Post-its */}
            <ul className="list-group">
                <li className="postit">
                    <div className="postit-content">Texto do Post-it</div>

                    <div className="d-flex justify-content-between align-items-end">
                        <div className="postit-footer">
                            Nome do Usuário - 01/01/2024
                        </div>
                        <div className="">
                            <i className="fs-6">✏️</i>
                            <i className="ps-2 fs-6">❌</i>
                        </div>
                    </div>
                </li>
            </ul>

            {/* Modal de confirmação de deleção */}
            <div className="modal fade show" style={{ display: 'block' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content postit">
                        <div className="modal-header">
                            <h5 className="modal-title">Atenção</h5>
                        </div>
                        <div className="modal-body">
                            <p>Você tem certeza que deseja deletar o post-it?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary">Cancelar</button>
                            <button type="button" className="btn btn-danger">Deletar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Visualização do Post-it */}
            <div className="modal fade show" style={{ display: 'block' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content postit">
                        <div className="modal-header view">
                            <h5 className="modal-title"></h5>
                        </div>
                        <div className="modal-body">
                            <p className="postit-content-modal">Texto do Post-it</p>
                        </div>

                        <div className="postit-footer d-flex justify-content-between align-items-end">
                            <span>Nome do Usuário - 01/01/2024</span>
                            <button type="button" className="btn btn-secondary">Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostItManager;
