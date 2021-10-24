import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type AuthResponse = {
    token: string;
    user: {
        id: string;
        name: string;
        avatar_url: string;
        login: string;
    }
}

type User = {
    name: string;
    id: string;
    login: string;
    avatar_url: string;
}

type AuthContextData = {
    user: User | null;//se não estiver logado, será usuário null
    signInUrl: string;
    signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

type AuthProvider = {
    children: ReactNode; // reactNode porque pode ser qualquer coisa
}

export function AuthProvider(props: AuthProvider) {
    const [user, setUser] = useState<User | null>(null);

    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=74a7d29917f03163707a`;

    async function signIn(githubCode: string) {
        const response = await api.post<AuthResponse>('authenticate', {
            code: githubCode,
        });

        const { token, user } = response.data; //pega os dados do back

        localStorage.setItem('@dowhile:token', token);//salva no localStorage
        
        // setando a autorização de enviar o token sempre mesmo logando
        api.defaults.headers.common.authorization = `Bearer ${token}`;

        setUser(user);//muda o estado do usuário
    }

    // criar função de SignOut
    function signOut() {
        localStorage.removeItem('@dowhile:token');
        setUser(null);
    }

    // controlando o token do usuario
    useEffect(() => {
        const token = localStorage.getItem('@dowhile:token');
        
        // toda requisição que for feita, vai passar o token
        api.defaults.headers.common.authorization = `Bearer ${token}`;
        if (token) {
            api.get<User>('profile').then(response => {
                setUser(response.data);
            });
        }

    }, []);

    useEffect(() => {
        const url = window.location.href;
        const hasGithubCode = url.includes("?code=");

        if (hasGithubCode) {
            const [urlWithouCode, githubCode] = url.split("?code=");
            console.log({urlWithouCode, githubCode});
            
            window.history.pushState({}, "", urlWithouCode);

            signIn(githubCode);
        }
    }, []);

  return( // ficará por volta de toda a aplicação para todos saberem que o usuário é autenticado
    /* duas chaves porque uma é informação javascript, a outra porque é um objeto */
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
        {props.children}
    </AuthContext.Provider>
    )
}