import { useState, useEffect } from "react";
import axios from "axios";
import BattleButton from "./components/BattleButton/BattleButon";
import Form from "./components/Form/Form";
import "./App.css";

function App() {
  const [player1, setPlayer1] = useState();
  const [player2, setPlayer2] = useState();
  const [totalPointPlayer1, setTotalPointPlayer1] = useState(0);
  const [totalPointPlayer2, setTotalPointPlayer2] = useState(0);
  const [starsPlayer1, setStarsPlayer1] = useState(0);
  const [starsPlayer2, setStarsPlayer2] = useState(0);
  const [showBattleButton, setShowBattleButton] = useState(false);
  const [battleStarted, setBattleStarted] = useState(false);
  const [resetForm, setResetForm] = useState(false);

  const PLAYER_1 = "Player 1";
  const PLAYER_2 = "Player 2";

  const handlePlayer1Data = (userData) => {
    setPlayer1(userData);
  };
  const handlePlayer2Data = (userData) => {
    setPlayer2(userData);
  };

  const handleBattle = () => {
    setShowBattleButton(false);
    setBattleStarted(true);

    axios(`https://api.github.com/users/${player1.login}/repos?per_page=100`)
      .then(({ data: reposPlayer1 }) => {
        const totalStarsPlayer1 = reposPlayer1.reduce(
          (acc, repo) => acc + repo.stargazers_count,
          0
        );
        setStarsPlayer1(totalStarsPlayer1);
        setTotalPointPlayer1(totalStarsPlayer1 + player1.followers);

        return axios(
          `https://api.github.com/users/${player2.login}/repos?per_page=100`
        );
      })
      .then(({ data: reposPlayer2 }) => {
        const totalStarsPlayer2 = reposPlayer2.reduce(
          (acc, repo) => acc + repo.stargazers_count,
          0
        );
        setStarsPlayer2(totalStarsPlayer2);
        setTotalPointPlayer2(totalStarsPlayer2 + player2.followers);
      })
      .catch((error) => {
        console.error("Error fetching repositories: ", error);
      });
  };
  const handleRestart = () => {
    setPlayer1(undefined);
    setPlayer2(undefined);
    setTotalPointPlayer1(0);
    setTotalPointPlayer2(0);
    setStarsPlayer1(0);
    setStarsPlayer2(0);
    setShowBattleButton(false);
    setBattleStarted(false);
    setResetForm(true);
  };
  useEffect(() => {
    if (resetForm) {
      setResetForm(false);
    }
  }, [resetForm]);

  useEffect(() => {
    if (player1 && player2) {
      setShowBattleButton(true);
    }
  }, [player1, player2]);
  return (
    <>
      <h2>Let's Get Ready to Rumble</h2>
      <div className="status__wrapper">
        {battleStarted && (
          <>
            {totalPointPlayer1 > totalPointPlayer2 ? (
              <h4>Winner 🥳</h4>
            ) : (
              <h4>Loser 🥵</h4>
            )}
            {totalPointPlayer2 > totalPointPlayer1 ? (
              <h4>Winner 🥳</h4>
            ) : (
              <h4>Loser 🥵</h4>
            )}
          </>
        )}
      </div>

      <div className="wrapper">
        <Form
          player={PLAYER_1}
          onUserDataFetched={handlePlayer1Data}
          battleStarted={battleStarted}
          followers={player1?.followers}
          stars={starsPlayer1}
          totalPoints={totalPointPlayer1}
          resetForm={resetForm}
        />
        <Form
          player={PLAYER_2}
          onUserDataFetched={handlePlayer2Data}
          battleStarted={battleStarted}
          followers={player2?.followers}
          stars={starsPlayer2}
          totalPoints={totalPointPlayer2}
          resetForm={resetForm}
        />
      </div>
      {showBattleButton && player1 && player2 && !battleStarted ? (
        <BattleButton onBattle={handleBattle} />
      ) : null}
      {battleStarted && <button onClick={handleRestart}>Restart 🔄</button>}
    </>
  );
}

export default App;
