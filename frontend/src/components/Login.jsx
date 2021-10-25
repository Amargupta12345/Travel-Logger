import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import { useRef, useState } from "react";
import "./login.css";

export default function Login({
  setShowLogin,
  setCurrentUsername,
  myStorage,
  setCurrentEmail,
}) {
  // using useState hooks of React

  const [error, setError] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      username: usernameRef.current.value,
    };
    console.log(user);
    try {
      const res = await axios.post("/users/login", user);
      setCurrentUsername(res.data.username);
      myStorage.setItem("user", res.data.username);
      setCurrentEmail(res.data.email);
      myStorage.setItem("emails", res.data.email);
      console.log(res.data.email);

      setShowLogin(false);
    } catch (err) {
      setError(true);
    }
  };

  //component Rendering

  return (
    <div className="loginContainer">
      <div className="logo">
        <Room className="logoIcon" />
        <span>Travel Logger</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input autoFocus placeholder="email" ref={emailRef} />
        <input autoFocus placeholder="username" ref={usernameRef} />
        <input
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="loginBtn" type="submit">
          Login
        </button>
        {error && (
          <span className="failure">
            Something went wrong! or Please Verfiy the email
          </span>
        )}
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}
