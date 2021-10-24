import { useContext, useState, FormEvent } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import { AuthContext } from '../../contexts/auth';
import { api } from '../../services/api';
import styles from "./styles.module.scss";

export function SendMessageForm() {
    const { user, signOut } = useContext(AuthContext);
    const [message, setMessage] = useState('');

    // função de cadastrar mensagem
    async function handleSendMessage(event: FormEvent) {
        event.preventDefault(); // evita o comportamento padrão do formulário de recarregar a página
        // verificar se o texto é vazio
        if (!message.trim()) {
            return;
        }

        await api.post('messages', { message });

        // limpar o input
        setMessage('');
        
    }
    
    return(
        <div className={styles.sendMessageFormWrapper}>
            <button onClick={signOut} className={styles.signOutButton}>
                <VscSignOut size="32" />
            </button>

            <header className={styles.userInformation}>
                <div className={styles.userImage}>
                    <img src={user?.avatar_url} alt={user?.name} />
                </div>
                <strong className={styles.userName}>
                    {user?.name}
                </strong>
                <span className={styles.userGithub}>
                    <VscGithubInverted size="16" />
                    {user?.login}
                </span>

            </header>

            <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
                <label htmlFor="message">Mensagem</label>
                <textarea
                 name="message" 
                 id="message" 
                 // toda vez que o usuario digitar algo no textarea, o valor do textarea sera atribuido ao state
                 onChange={(e) => setMessage(e.target.value)}
                 value={message}
                 placeholder="Qual a sua espectativa para o evento?" />
                <button type="submit">Enviar Mensagem</button>
            </form>
        </div>
    )
}
