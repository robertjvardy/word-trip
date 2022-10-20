import styles from "./app.module.scss";
import axios from "axios";

const App = () => {
  const test = async () =>
    await axios
      .get("http://localhost:8080/game/init")
      .then((response) => {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });

  return (
    <div className={styles.app}>
      <header className={styles["app-header"]}>
        Learn React
        <button onClick={test}>Test</button>
      </header>
    </div>
  );
};

export default App;
