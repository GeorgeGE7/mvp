import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import { IoMdDoneAll } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { verifyAccountEmail } from "../../redux/apiCalls/authApiCall";

import "./emailVerification.css";

const EmailVerification = () => {
  const dispatch = useDispatch();
  const { isEmailVerified } = useSelector((state) => state.auth);

  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(verifyAccountEmail(userId, token));
  }, [token, userId]);

  return (
    <main id="email-verification-main">
      <div id="email-verification">
        {isEmailVerified ? (
          <>
            {/* <div id="email-verification-icon">
              <IoMdDoneAll
                size={70}
                color="green"
                style={{ width: "100%", margin: "1rem auto 1rem auto" }}
              />
            </div> */}
            <h1 id="email-verification-title">
              Your Email verified successfully
            </h1>
            <h2>
              You can <Link to={"/login"}>Login</Link> now!
            </h2>
          </>
        ) : (
          <>
            <h1 id="email-verification-title">Not Found!</h1>
          </>
        )}
      </div>
    </main>
  );
};

export default EmailVerification;
