import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { useUsuario } from "../context/UsuarioContext";

const PostItManager = () => {
    const [newPostit, setNewPostit] = useState('');
    const [showEditor, setShowEditor] = useState(false);
    const [editingPostit, setEditingPostit] = useState(null);
    const [postits, setPostits] = useState([]);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [viewPostit, setViewPostit] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    const { usuario } = useUsuario(); // Acessando o usuário do contexto

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(2);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} - ${hours}:${minutes}`;
    }


    const deletePostit = async (id) => {
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

    const fetchPostits = useCallback(async () => {
        try {
            const response = await fetch(`${apiUrl}/api/postits`);
            if (!response.ok) throw new Error('Falha ao buscar post-its');
            const data = await response.json();
            setPostits(data);
        } catch (error) {
            console.error(error);
        }
    }, [apiUrl]);

    const addPostit = async () => {
        if (!newPostit || !usuario) {
            console.log('Usuário não autenticado ou Post-it vazio!');
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/api/postits`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: newPostit,
                    usuario: {
                        nome: usuario.nome,
                        // avatar: usuario.avatar,
                    },
                }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error('Erro no servidor:', errorData);
            }

            const newItem = await response.json();
            setPostits(prevPostits => [...prevPostits, newItem]);
            setNewPostit('');
            setShowEditor(false);
            await fetchPostits();

        } catch (error) {
            console.error('Erro ao adicionar post-it:', error.message);
        }
    };

    const updatePostit = async () => {
        if (!editingPostit) return;
        try {
            const response = await fetch(`${apiUrl}/api/postits/${editingPostit._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: newPostit,
                    usuario: {
                        nome: usuario.nome,
                        //avatar: usuario.avatar,
                    },
                }),
            });

            if (!response.ok) throw new Error('Falha ao atualizar post-it');
            const updatedItem = await response.json();
            setPostits(prevPostits => prevPostits.map(postit => (postit._id === updatedItem._id ? updatedItem : postit)));

        } catch (error) {
            console.error(error);
        }
        setShowEditor(false);
        await fetchPostits();
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/postits/${confirmDeleteId}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Falha ao deletar post-it');
            setPostits(postits.filter(postit => postit._id !== confirmDeleteId));
            await fetchPostits();
        } catch (error) {
            console.error(error);
        } finally {
            setConfirmDeleteId(null);
        }
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

    useEffect(() => {
        fetchPostits();
    }, [fetchPostits]);

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
                                overlay={
                                    <Tooltip id={`tooltip-${postit._id}`}>
                                        Clique para ampliar
                                    </Tooltip>
                                }
                            >
                                <div className="postit-content">{postit.text} </div>
                            </OverlayTrigger>

                            <div className="d-flex justify-content-between align-items-end">
                                <div className="postit-footer ">
                                    {postit.usuario.nome}{" - "}{formatDate(postit.createdAt)}
                                </div>
                                <div className="">
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip id={`edit-tooltip-${postit._id}`}>
                                                Editar
                                            </Tooltip>
                                        }
                                    >
                                        <i className="fs-6"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEditingPostit(postit);
                                                openPostitEditor(postit);
                                            }
                                            }>
                                            ✏️
                                        </i>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip id={`delete-tooltip-${postit._id}`}>
                                                Excluir
                                            </Tooltip>
                                        }
                                    >
                                        <i className="ps-2 fs-6"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deletePostit(postit._id);
                                            }
                                            }>
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
                                {/* <button type="button" className="close" onClick={() => setConfirmDeleteId(null)} aria-label="Close"> */}
                                {/* <span>&times;</span> */}
                                {/* </button> */}
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
                                <div className="modal-body ">
                                    <p className="postit-content-modal">{viewPostit.text}</p>
                                </div>

                                {/* Exibindo o nome e a data do usuário */}
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