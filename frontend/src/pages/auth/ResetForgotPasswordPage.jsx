import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import "./auth-form.css";
import { postActions } from "../../redux/slices/postSlice";
import {
  getResetPasswordLink,
  setNewPasswordForForgotPassword,
} from "../../redux/apiCalls/passwordApicall";

const ResetForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.password);

  const navigate = useNavigate();
  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(getResetPasswordLink(userId, token));
  }, [userId, token]);

  useEffect(() => {
    dispatch(postActions.hideSearchBar());
  }, []);

  const [password, setPassword] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (password.trim() == "") {
      return toast.error("Password is required");
    }

    dispatch(setNewPasswordForForgotPassword(password, { userId, token }));
    navigate("/login");
  };

  return (
    <main>
      <div className="form-container">
        {isError ? (
          <h1>Not Found, Invalid URL!</h1>
        ) : (
          <>
            <h1>Create new password</h1>
            <form onSubmit={formSubmitHandler} className="auth-form">
              <div className="auth-form">
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button className="btn" type="submit">
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
};
export default ResetForgotPasswordPage;
