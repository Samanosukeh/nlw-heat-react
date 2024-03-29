import { useContext } from "react";
import styles from "./App.module.scss";
import { LoginBox } from "./components/LoginBox/LoginBox";
import { MessageList } from "./components/MessageList";
import { SendMessageForm } from "./components/SendMessageForm";
import { AuthContext } from "./contexts/auth";

export function App() {
  const { user } = useContext(AuthContext);

  return (
    <main className={`${styles.contentWrapper} ${!!user ? styles.contentSigned: ''}`}>
      <MessageList />
      {/* Se usuário nao tiver nulo, mostrar o login */}
      { !!user ? <SendMessageForm /> : <LoginBox /> }
    </main>
  )
}
