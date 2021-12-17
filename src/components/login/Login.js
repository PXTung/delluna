import { useContext } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConstantContext } from "../../context/Constant";
import { UserContext } from "../../context/User";

const Login = () => {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const constant = useContext(ConstantContext);
  const host = constant.host_api;

  const LoginHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    var formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    fetch(host + "/authenticate", {
      method: "POST",
      body: formData,
      redirect: "follow",
    })
      .then((rest) => rest.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        userContext.setUsername(data.name);
        userContext.setAuthenticated(true);
        history.push("/");
      })
      .catch((error) => {
        toast("INVALID USERNAME OR PASSWORD");
        console.log(error);
      });
  };

  return (
    <>
      <div className="visual"></div>
      <section className="login">
        <div className="login-introduce">
          <div className="login-infor">
            <div className="login-logo">SHOPEE</div>
            <div className="login-wellcome">WELLCOME BACK!</div>
            <div className="login-separate"></div>
            <label>Please login to your Account</label>
          </div>
          <div className="login-background"></div>
        </div>
        <form
          className="login-content"
          onSubmit={(e) => LoginHandler(e)}
          autoComplete="off"
        >
          <div className="login-icon">
            <i className="fas fa-lock fa-3x"></i>
          </div>
          <div className="login-title">LOGIN</div>
          <div className="login-field">
            <label htmlFor="email" className="login-label">
              Username
            </label>
            <input
              type="text"
              className="login-email"
              id="email"
              placeholder="E-mail"
            />
          </div>
          <div className="login-field">
            <label htmlFor="password" className="login-label">
              Password
            </label>
            <input
              type="password"
              className="login-password"
              id="password"
              placeholder="Password"
            />
          </div>
          <div className="login-field login-addition">
            <div className="login-remember">
              <input
                type="checkbox"
                className="login-remember-checkbox"
                id="remember"
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <div className="login-forgot">Forgot Password</div>
          </div>
          <div className="login-field login-button">
            <button className="login-login">LOGIN</button>
            <button className="login-register">REGISTER</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
