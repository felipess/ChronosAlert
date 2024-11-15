import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useState } from "react";

const PostItManager = () => {
    const [newPostit, setNewPostit] = useState('');
    const [showEditor, setShowEditor] = useState(false);
    const [editingPostit, setEditingPostit] = useState(null);
    const [postits, setPostits] = useState([
        {
            _id: "1",
            text: "Exemplo de Post-it",
            usuario: { nome: "João" },
            createdAt: new Date().toISOString()
        },
        {
            _id: "2",
            text: "Outro exemplo de Post-it",
            usuario: { nome: "Maria" },
            createdAt: new Date().toISOString()
        }
    ]);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [viewPostit, setViewPostit] = useState(null);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(2);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} - ${hours}:${minutes}`;
    }

    const deletePostit = (id) => {
        setConfirmDeleteId(id);
    };

    const openViewModal = (postit) => {
        setViewPostit(postit);
        setShowEditor(false);
    };

    const closePostitEditor = () => {
        setShowEditor(false);
        setNewPostit('');
        setEditingPostit(null);
    };

    const closeViewModal = () => {
        setViewPostit(null);
    };

    const addPostit = () => {
        if (!newPostit) return;

        const newPostIt = {
            _id: (postits.length + 1).toString(),  // Gerar um ID simples de exemplo
            text: newPostit,
            usuario: { nome: "Usuário Exemplo" },
            createdAt: new Date().toISOString()
        };

        setPostits([...postits, newPostIt]);
        setNewPostit('');
        setShowEditor(false);
    };

    const updatePostit = () => {
        if (!editingPostit) return;

        const updatedPostit = {
            ...editingPostit,
            text: newPostit
        };

        setPostits(postits.map(postit => postit._id === updatedPostit._id ? updatedPostit : postit));
        setShowEditor(false);
    };

    const handleConfirmDelete = () => {
        setPostits(postits.filter(postit => postit._id !== confirmDeleteId));
        setConfirmDeleteId(null);
    };

    const openPostitEditor = (postit = null) => {
        setShowEditor(true);
        if (postit) {
            setNewPostit(postit.text);
            setEditingPostit(postit);
        } else {
            setNewPostit('');
            setEditingPostit(null);
        }
    };

    return (
        <div className='pt-6'>
            <span className="postit-controls mb-3 fs-5 ps-2">Post-its
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="add-postit-tooltip">Adicionar Post-it</Tooltip>}
                >
                    <i className="bi bi-plus-circle px-3 fs-4"
                        onClick={() => openPostitEditor()}
                        style={{ cursor: 'pointer' }}
                    ></i>
                </OverlayTrigger>
                {showEditor && (
                    <div className="postit-editor">
                        <textarea
                            maxLength={99}
                            value={newPostit}
                            onChange={(e) => setNewPostit(e.target.value)}
                            placeholder="Exemplo: 5023311-86.2024.4.04.7002 - Procurador XYZ ciente"
                            wrap="soft"
                            style={{ resize: "none", padding: "5px" }}
                        />
                        <div className="postit-controls d-flex justify-content-end">
                            <div className='pe-2'>
                                <button type="button" className="btn btn-secondary" onClick={closePostitEditor}>
                                    Cancelar
                                </button>
                            </div>
                            <div onClick={editingPostit ? updatePostit : addPostit}>
                                {editingPostit
                                    ? <button type="button" className="btn btn-primary">Atualizar</button>
                                    : <button type="button" className="btn btn-primary">Adicionar</button>}
                            </div>
                        </div>
                    </div>
                )}

                <ul className="list-group">
                    {postits.map(postit => (
                        <li key={postit._id} className="postit" onClick={() => openViewModal(postit)}>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id={`tooltip-${postit._id}`}>Clique para ampliar</Tooltip>}
                            >
                                <div className="postit-content">{postit.text}</div>
                            </OverlayTrigger>

                            <div className="d-flex justify-content-between align-items-end">
                                <div className="postit-footer">
                                    {postit.usuario.nome}{" - "}{formatDate(postit.createdAt)}
                                </div>
                                <div className="">
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id={`edit-tooltip-${postit._id}`}>Editar</Tooltip>}
                                    >
                                        <i className="fs-6" onClick={(e) => { e.stopPropagation(); setEditingPostit(postit); openPostitEditor(postit); }}>
                                            ✏️
                                        </i>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id={`delete-tooltip-${postit._id}`}>Excluir</Tooltip>}
                                    >
                                        <i className="ps-2 fs-6" onClick={(e) => { e.stopPropagation(); deletePostit(postit._id); }}>
                                            ❌
                                        </i>
                                    </OverlayTrigger>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Modal de confirmação de deleção */}
                <div className={`modal fade ${confirmDeleteId !== null ? 'show' : ''}`} style={{ display: confirmDeleteId !== null ? 'block' : 'none' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content postit">
                            <div className="modal-header">
                                <h5 className="modal-title">Atenção</h5>
                            </div>
                            <div className="modal-body">
                                <p>Você tem certeza que deseja deletar o post-it?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setConfirmDeleteId(null)}>Cancelar</button>
                                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Deletar</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal de Visualização do Post-it */}
                {viewPostit && (
                    <div className={`modal fade show`} style={{ display: 'block' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content postit">
                                <div className="modal-header view">
                                    <h5 className="modal-title"></h5>
                                </div>
                                <div className="modal-body">
                                    <p className="postit-content-modal">{viewPostit.text}</p>
                                </div>

                                <div className="postit-footer d-flex justify-content-between align-items-end">
                                    <span>
                                        {viewPostit.usuario ? (viewPostit.usuario.nome + " - ") : 'Nome não disponível'}
                                        {viewPostit.createdAt ? formatDate(viewPostit.createdAt) : 'Data não disponível'}
                                    </span>
                                    <button type="button" className="btn btn-secondary" onClick={closeViewModal}>
                                        Fechar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </span>
        </div>
    );
};

export default PostItManager;
