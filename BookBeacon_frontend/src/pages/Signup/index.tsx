import "./styles.css";
import { useState } from "react";
import { callSignupAPI } from "../services/auth";
import { useNavigate } from "react-router-dom";
export interface signupForm {
  first_name: string;
  second_name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [signupForm, SetSignupForm] = useState<signupForm>({
    first_name: "",
    second_name: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await callSignupAPI(
        signupForm.first_name,
        signupForm.second_name,
        signupForm.email,
        signupForm.password
      );

      console.log("response data", response.data);
    } catch (err) {
      alert({err});
    }
    navigate("/login");
  };
  const navigate=useNavigate()
  return (
    <>
      <h1 className="text-3xl font-bold text-center text-gray-800 mt-8 mb-6 tracking-wide">
        BookBeacon
      </h1>

      
        <div className="signup-container-wrapper">
          <div className="signupcontainer">
            <div className="signup-heading">
              <h1>SignUp</h1>
            </div>
            <form className="formcontainer" onSubmit={(e) => handleSubmit(e)}>
              <div className="fields">
                <label className="field-labels" htmlFor="">
                  First Name
                </label>
                <input
                  type="text"
                  className="input1"
                  name="first name"
                  required
                  value={signupForm?.first_name}
                  onChange={(e) => {
                    SetSignupForm({
                      ...signupForm,
                      first_name: e?.currentTarget?.value,
                    });
                  }}
                />
              </div>
              <div className="fields">
                <label className="field-labels" htmlFor="">
                  Last Name
                </label>
                <input
                  type="text"
                  className="input1"
                  name="last name"
                  required
                  value={signupForm?.second_name}
                  onChange={(e) => {
                    SetSignupForm({
                      ...signupForm,
                      second_name: e?.currentTarget?.value,
                    });
                  }}
                />
              </div>
              <div className="fields">
                <label className="field-labels" htmlFor="">
                  Email
                </label>
                <input
                  type="email"
                  className="input1"
                  name="email"
                  required
                  value={signupForm?.email}
                  onChange={(e) => {
                    SetSignupForm({
                      ...signupForm,
                      email: e?.currentTarget?.value,
                    });
                  }}
                />
              </div>
              <div className="fields">
                <label className="field-labels" htmlFor="">
                  Password
                </label>
                <input
                  className="input1"
                  type="password"
                  name="password"
                  required
                  value={signupForm?.password}
                  onChange={(e) =>
                    SetSignupForm({
                      ...signupForm,
                      password: e?.currentTarget?.value,
                    })
                  }
                />
              </div>
              <div>
                <button id="btn" className="signup-submit" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      
    </>
  );
};

export default Signup;
