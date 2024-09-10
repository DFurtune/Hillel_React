import { useState, useEffect } from "react";
import axios from "axios";
import "./Form.css";

const Form = ({
  player,
  onUserDataFetched,
  battleStarted,
  resetForm,
  followers,
  stars,
  totalPoints,
}) => {
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");
  const [login, setLogin] = useState("");

  const USER_API = `https://api.github.com/users/${userName}`;

  const handleFetchData = async (event) => {
    event.preventDefault();

    await axios(USER_API)
      .then(({ data }) => {
        onUserDataFetched(data);
        setAvatar(data.avatar_url);
        setLogin(data.login);
        setError("");
      })
      .catch(() => {
        setError("Username not exist");
        console.error("Username not exist");
      });
    setUserName("");
  };
  const handleResetForm = () => {
    onUserDataFetched(null);
    setAvatar("");
    setLogin("");
    setUserName("");
    setError("");
  };

  useEffect(() => {
    if (resetForm) {
      handleResetForm();
    }
  }, [resetForm]);

  return (
    <div className="user">
      {avatar && login ? (
        <div>
          <img src={avatar} alt="User avatar" />
          <h3>@{login}</h3>
          {battleStarted && (
            <div>
              <p>Followers: {followers}</p>
              <p>Repositories stars: {stars}</p>
              <p>Total score: {totalPoints}</p>
            </div>
          )}
          {!battleStarted && <button onClick={handleResetForm}>Reset</button>}
        </div>
      ) : (
        <form>
          <label>
            Choose {player} username:
            <br />
            <input
              className={error ? "error" : null}
              type="text"
              placeholder={player}
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
          </label>
          {error ? <div className="error">{error}</div> : null}
          <button type="submit" onClick={handleFetchData}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Form;
