import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import Sidebar from './Sidebar';
import TabelaResultados from './TabelaResultados';
import '../styles/custom.css';

document.title = "**Chronos**" //ChronosAlert

const DashboardResultados = ({ setNotifications }) => {
	const apiUrl = process.env.REACT_APP_API_URL;
	const [resultados, setResultados] = useState([]);
	const [aviso, setAviso] = useState({ titulo: '', mensagem: '', tipo: '' });
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [ultimaConsulta, setUltimaConsulta] = useState('')
	const [proximaConsulta, setProximaConsulta] = useState('')
	const [dataInicio, setdataInicio] = useState('')
	const [dataFim, setdataFim] = useState('')
	const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
	const [showPermissionWarning, setShowPermissionWarning] = useState(false);
	const [horaAtualizadaPorInterval, setHoraAtualizadaPorInterval] = useState(new Date().getTime());

	const toggleMenu = (event) => {
		event.preventDefault();
		setIsMenuCollapsed(!isMenuCollapsed);
		localStorage.setItem('isMenuCollapsed', JSON.stringify(!isMenuCollapsed));
	};

	useEffect(() => {
		if (Notification.permission === 'default') {
			setShowPermissionWarning(true);
		} else {
			setShowPermissionWarning(false);
		}
	}, []);

	const handleRequestPermission = (event) => {
		event.preventDefault();
		Notification.requestPermission().then(permission => {
			if (permission === 'granted') {
				setShowPermissionWarning(false);
			} else {
				setShowPermissionWarning(true);
				setAviso({
					titulo: (<><i className="bi bi-exclamation-circle-fill fs-5 px-2"> </i>Importante! <br /></>),
					mensagem: (<div className="px-10">Para receber alertas sobre novos resultados, você precisa permitir notificações no seu navegador. Você pode ajustar isso nas configurações do seu navegador.</div>),
					tipo: 'danger'
				});
			}
		});
	};

	const formatarData = (data) => {
		if (!data) return 'Não disponível';

		const dateObj = parseISO(data);

		return format(dateObj, 'dd/MM/yyyy');
	};

	function formatarHora(dataHora) {
		const data = new Date(dataHora);
		return format(data, 'HH:mm:ss');
	}

	const fetchResultados = useCallback(async () => {
		setIsLoading(true);

		if (!navigator.onLine) {
			setAviso({
				titulo: null,
				mensagem: (
					<>
						<i className="bi bi-wifi-off fs-5 px-2"></i> Erro de conexão
						<hr />
						<div className="px-10"> Parece que você está offline.
							<br /> Verifique sua conexão com a internet.
						</div>
					</>
				),
				tipo: 'danger'
			});
			setResultados([]);
			setIsLoading(false);
			return;
		}

		try {
			const response = await axios.get(`${apiUrl}/resultados`);
			const dadosItem = response.data;
			const ultimaConsultaFormatada = formatarHora(dadosItem.ultimaConsulta);
			const proximaConsultaFormatada = formatarHora(dadosItem.proximaConsulta);
			const dataInicioFormatada = formatarData(dadosItem.dataInicio);
			const dataFimFormatada = formatarData(dadosItem.dataFim);

			setAviso({ titulo: null, mensagem: null, tipo: null });
			setUltimaConsulta(ultimaConsultaFormatada);
			// console.log("Fetch aos: ", ultimaConsultaFormatada);
			setProximaConsulta(proximaConsultaFormatada);
			setdataInicio(dataInicioFormatada);
			setdataFim(dataFimFormatada);

			if (dadosItem.resultados && Array.isArray(dadosItem.resultados) && dadosItem.resultados.length > 0) {
				const resultados = dadosItem.resultados;
				const dados = resultados.flatMap(item => {
					if (item.dados && Array.isArray(item.dados)) {
						return item.dados.map(dado => ({
							dataHora: dado[0] || 'Não disponível',
							processo: dado[1] || 'Não disponível',
							juizo: dado[2] || 'Não disponível',
							sala: dado[3] || 'Não disponível',
							evento: dado[4] || 'Não disponível',
							status: dado[5] || 'Não disponível',
						}));
					} else {
						console.warn('Dados não é um array ou está ausente:', item.dados);
						return [];
					}
				});

				if (dados && dados.length > 0) {
					setResultados(dados);
				} else {
					setAviso({
						titulo: null,
						mensagem: (<><i className="bi bi-search fs-5 px-2"> </i>Nenhum resultado encontrado</>),
						tipo: 'warning'
					});
					setResultados([]);
				}
			} else {
				console.warn('Dados não é um array ou está ausente');
				setResultados([]);
				return;
			}
		} catch (error) {
			console.error('Erro ao buscar resultados:', error);

			setAviso({
				titulo: (<><i className="bi bi-exclamation-diamond fs-5 px-2"></i>Tente novamente mais tarde.<hr /> </>),
				mensagem: (<div className="px-10">Houve um problema ao buscar os dados. </div>),
				tipo: 'danger'
			});
			setResultados([]);
		}
		try {
			const response = await axios.get(`${apiUrl}/notificacoes`);
			const dadosNotificacoes = response.data;
			setNotifications(dadosNotificacoes);
		} catch (error) {
			console.error('Erro ao buscar notificações:', error);
			setAviso({
				titulo: (<><i className="bi bi-exclamation-diamond fs-5 px-2"></i>Tente novamente mais tarde.<hr /> </>),
				mensagem: (<div className="px-10">Houve um problema ao buscar as notificações. </div>),
				tipo: 'danger'
			});
		} finally {
			setIsLoading(false);
		}

	}, [apiUrl, setNotifications]);

	useEffect(() => {
		fetchResultados();
	}, [fetchResultados]);

	// Agrupando resultados por status sempre que resultados mudar
	const resultadosPorStatus = resultados.reduce((acc, dado) => {
		if (!acc[dado.status]) {
			acc[dado.status] = [];
		}
		acc[dado.status].push(dado);
		return acc;
	}, {});

	// Verificar modo dark
	useEffect(() => {
		const isDark = document.body.classList.contains('dark');
		setIsDarkMode(isDark);

		const observer = new MutationObserver(() => {
			const isDark = document.body.classList.contains('dark');
			setIsDarkMode(isDark);
		});
		observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
		return () => observer.disconnect();
	}, []);

	// Verificar isMenuCollapsed
	useEffect(() => {
		const storedMenuState = localStorage.getItem('isMenuCollapsed');
		if (storedMenuState !== null) {
			setIsMenuCollapsed(JSON.parse(storedMenuState));
		}
	}, []);

	// Converter hora para milissegundos 
	const getHoraEmMilissegundos = (hora) => {
		const [h, m, s] = hora.split(':').map(Number);
		const data = new Date();
		data.setHours(h, m, s, 0);
		return data.getTime();
	};

	// Atualiza hora para comparação 
	const atualizarHora = () => {
		const horaAtual = new Date().getTime();
		setHoraAtualizadaPorInterval(horaAtual);
	};

	// Chama atualização de hora em intervalos
	useEffect(() => {
		const intervalId = setInterval(() => {
			atualizarHora();
		}, 60000);
		return () => clearInterval(intervalId);
	}, []);

	// Verifica se a hora atual já passou de proximaConsulta
	useEffect(() => {
		const proximaConsultaHora = getHoraEmMilissegundos(proximaConsulta);

		if (proximaConsulta === '' || ultimaConsulta === '') {
			fetchResultados();
		}

		if (proximaConsultaHora <= horaAtualizadaPorInterval) {
			fetchResultados();
		}
	}, [proximaConsulta, ultimaConsulta, horaAtualizadaPorInterval, fetchResultados]);

	// Atualizar resultados
	const handleAtualizar = () => {
		fetchResultados();
	};

	if (isLoading) {
		return (
			<div className="loading-container">
				<div className="spinner"></div>
				<p>Carregando...</p>
			</div>
		);
	}

	return (
		<div className="container-fluid p-0 min-h-screen d-flex flex-column">
			<div className="d-flex flex-grow-1">
				<Sidebar
					isMenuCollapsed={isMenuCollapsed}
					toggleMenu={toggleMenu}
					ultimaConsulta={ultimaConsulta}
					proximaConsulta={proximaConsulta}
					dataInicio={dataInicio}
					dataFim={dataFim}
					isDarkMode={isDarkMode}
					handleAtualizar={handleAtualizar}
					isLoading={isLoading}
				/>
				<TabelaResultados
					resultadosPorStatus={resultadosPorStatus}
					showPermissionWarning={showPermissionWarning}
					isDarkMode={isDarkMode}
					handleRequestPermission={handleRequestPermission}
					aviso={aviso}
				/>

			</div>
		</div >
	);
};
export default DashboardResultados;