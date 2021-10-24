import { useContext, useEffect } from 'react';
import { VscGithubInverted } from 'react-icons/vsc'
import { AuthContext } from '../../contexts/auth';

import styles from "./styles.module.scss"

export function LoginBox() {    
    // importando o contexto do usuário
    const { user, signInUrl } = useContext(AuthContext);

    console.log(user);

    return(
        <div className={styles.loginBoxWrapper}>
            <strong>Entre e compartilhe sua mensagem</strong>
            <a href={signInUrl} className={styles.signInWithGithub}>
                <VscGithubInverted  size="24"/>
                Entrar com Github
            </a>
        </div>
    )
}