import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import "./auth-form.css";
import { requestResetForgotPassword } from "../../redux/apiCalls/passwordApicall";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [pressed, setPressed] = useState(false);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (email.trim() == "" || !email) {
      return toast.error("Email is required");
    }
    setPressed(true);
    dispatch(requestResetForgotPassword(email));
  };

  return (
    <main>
      <div className="form-container">
        <h1>Reset password</h1>
        <form onSubmit={formSubmitHandler} className="auth-form">
          <div className="auth-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            style={{ backgroundColor: pressed && "gray" }}
            disabled={pressed}
            className="btn"
            type="submit"
          >
            {!pressed ? "Submit" : "You will receive an email soon!"}
            
          </button>
        </form>
      </div>
    </main>
  );
};
export default ForgotPasswordPage;
