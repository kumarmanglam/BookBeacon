import { useState, useEffect } from "react";
import './styles.css'
import { callLoginAPI } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectLicenseState } from "../../store/selectors/License.selector";
import { setIsUserLoggedIn } from "../../store/reducers/License.reducer";
export interface loginForm {
  email: string;
  password: string;
}


const Login = () => {
  const [loginForm, SetLoginForm] = useState<loginForm>({
    email: "",
    password: "",
  });

  const [isLogButtonActive, setIsLogButtonActive] = useState<boolean>(false);
  const dispatch = useDispatch();
  const licenseState = useSelector(selectLicenseState);
  useEffect(() => {
    const { email, password } = loginForm;
    setIsLogButtonActive(email.trim() !== "" && password.length >= 8);
  }, [loginForm]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {

      dispatch(setIsUserLoggedIn(true));
      const response = await callLoginAPI(loginForm.email, loginForm.password);

      console.log("response token...", response.data.token);
      console.log(response.status)

      sessionStorage.setItem("token", response.data.token);
      if (response.status === 200)
        navigate('/licenses')
    } catch (err) {
      alert("Invalid credentials, please try again.");
    }

  };
  const navigate = useNavigate()
  return (
    <>
      <h1 className="text-3xl font-bold text-center text-gray-800 mt-8 mb-6 tracking-wide">BookBeacon</h1>

      <div className="mt-10">
        <div className="login-container-wrapper">
          <div className="logincontainer">
            <div className="login-heading">
              <h1>Login</h1>
            </div>

            <form className="formcontainer" onSubmit={(e) => handleSubmit(e)}>
              <div className="fields">
                <label className="field-labels">Email</label>
                <br />
                <input
                  type="email"
                  id="input"
                  name="email"
                  required
                  value={loginForm?.email}
                  onChange={(e) => {
                    SetLoginForm({
                      ...loginForm,
                      email: e?.currentTarget?.value,
                    });
                  }}
                />
              </div>
              <div className="fields">
                <label className="field-labels">Password</label>
                <br />
                <input
                  id="input"
                  type="password"
                  name="password"
                  required
                  value={loginForm?.password}
                  onChange={(e) =>
                    SetLoginForm({
                      ...loginForm,
                      password: e?.currentTarget?.value,
                    })
                  }
                />
              </div>

              <div className="login-submit">
                <button id="btn" type="submit" value="Sign in" disabled={!isLogButtonActive} >
                  Submit
                </button>
              </div>
            </form>
            <div className="signup-prompt">Do not have an account?<Link to="/signup"><b>SignUp</b></Link></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
