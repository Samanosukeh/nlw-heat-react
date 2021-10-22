import styles from "./styles.module.scss";

import logoImg from "../../assets/logo.svg";

export function MessageList() {
    return(
        <div className={styles.messagelistWrapper}>
            <img src={logoImg} alt="DoWhile 2021" />

            <ul className={styles.messageList}>
                <li className={styles.message}>
                    <p className={styles.messageContent}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi ipsum ratione ipsa sequi suscipit at temporibus natus perspiciatis, cupiditate nostrum aliquid recusandae autem cum debitis reprehenderit necessitatibus architecto omnis delectus.</p>
                    <div className={styles.messageUser}>
                        <div className={styles.userImage}>
                            <img src="https://github.com/Samanosukeh.png" alt="Samanosukeh" />
                        </div>
                        <span>Flauberth Duarte</span>

                    </div>
                </li>

                <li className={styles.message}>
                    <p className={styles.messageContent}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi ipsum ratione ipsa sequi suscipit at temporibus natus perspiciatis, cupiditate nostrum aliquid recusandae autem cum debitis reprehenderit necessitatibus architecto omnis delectus.</p>
                    <div className={styles.messageUser}>
                        <div className={styles.userImage}>
                            <img src="https://github.com/Samanosukeh.png" alt="Samanosukeh" />
                        </div>
                        <span>Flauberth Duarte</span>

                    </div>
                </li>

                <li className={styles.message}>
                    <p className={styles.messageContent}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi ipsum ratione ipsa sequi suscipit at temporibus natus perspiciatis, cupiditate nostrum aliquid recusandae autem cum debitis reprehenderit necessitatibus architecto omnis delectus.</p>
                    <div className={styles.messageUser}>
                        <div className={styles.userImage}>
                            <img src="https://github.com/Samanosukeh.png" alt="Samanosukeh" />
                        </div>
                        <span>Flauberth Duarte</span>

                    </div>
                </li>
            </ul>
        </div>
    )
}