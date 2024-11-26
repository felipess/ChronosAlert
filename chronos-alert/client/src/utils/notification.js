import { tabAlertUser } from "./tabAlert";
export const sendNotification = (mensagens) => {
    const notificacoesEnviadas = JSON.parse(localStorage.getItem('notificacoesEnviadas')) || [];

    // Filtra as mensagens que ainda não foram enviadas
    const novasMensagens = mensagens.filter((mensagem) => {
        if (mensagem.resultado && Array.isArray(mensagem.resultado.dados)) {

            // Juntando valores do array para criar uma string
            const textoMensagem = mensagem.resultado.dados.join(' ');

            // Verifica se essa mensagem já foi enviada anteriormente
            return !notificacoesEnviadas.includes(textoMensagem);
        }
        return false;
    });

    if (novasMensagens.length > 0 && Notification.permission === 'granted') {
        novasMensagens.forEach((mensagem) => {
            if (mensagem.resultado && Array.isArray(mensagem.resultado.dados)) {
                const textoMensagem = mensagem.resultado.dados.join(' ');

                if (!textoMensagem.includes("Status: REALIZADA")) {
                    const notificacao = new Notification('Aviso de custódia:', {
                        body: textoMensagem,
                        icon: `${process.env.PUBLIC_URL}/siren.ico`
                    });

                    notificacao.onclick = () => {
                        console.log('Notificação clicada!');
                        notificacao.close();
                    };

                    // Adiciona a mensagem ao array de notificações enviadas
                    notificacoesEnviadas.push(textoMensagem);
                }
            }
        });
        tabAlertUser();
        // Salva as mensagens enviadas no localStorage
        localStorage.setItem('notificacoesEnviadas', JSON.stringify(notificacoesEnviadas));
    }
};
