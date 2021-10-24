import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { io } from "socket.io-client";

import styles from "./styles.module.scss";

import logoImg from "../../assets/logo.svg";

type Message = {
    id: string;
    text: string;
    user: {
        name: string;
        avatar_url: string;
    }
}

// criar fila de mensagens
const messageQueue: Message[] = [];

const socket = io("http://localhost:4000");

socket.on('new_message', (newMassage: Message) => {
    messageQueue.push(newMassage);
})

export function MessageList() {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (messageQueue.length > 0) { // se eu tenho uma mensagem na fila
                setMessages(prevState => [//prevState = função recebe o valor anterior e então retorna um novo valor
                    messageQueue[0], 
                    prevState[0],
                    prevState[1]
                ].filter(Boolean)); // filtro para não repetir mensagens

                //tirando as mensagens da tela
                messageQueue.shift();
            }
        }, 3000); // verifica a cada 3 segundos
    });

    /*1° param: o que fazer, 2° param: quando o quê mudar? */
    useEffect(() => {
        api.get<Message[]>('messages/last3').then(response => {
            setMessages(response.data);
        })
    }, [])

    return(
        <div className={styles.messagelistWrapper}>
            <img src={logoImg} alt="DoWhile 2021" />

            <ul className={styles.messageList}>
                {messages.map(message => {
                  return(
                    <li key={message.id} className={styles.message}>
                        <p className={styles.messageContent}>{message.text}</p>
                        <div className={styles.messageUser}>
                            <div className={styles.userImage}>
                                <img src={message.user.avatar_url} alt={message.user.name} />
                            </div>
                            <span>{message.user.name}</span>
                        </div>
                    </li>
                  )
                })}
            </ul>
        </div>
    )
}