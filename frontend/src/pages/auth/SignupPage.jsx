import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import swal from "sweetalert";
import {
  CitySelect,
  CountrySelect,
  GetCountries,
  StateSelect,
} from "react-country-state-city";

import { signupUser } from "../../redux/apiCalls/authApiCall";

import "react-country-state-city/dist/react-country-state-city.css";
import "./auth-form.css";
import { postActions } from "../../redux/slices/postSlice";

const SignupPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postActions.hideSearchBar());
  }, []);

  const [ConnectedToInternet, setConnectedToInternet] = useState(false);

  const checkCountriesAndInternetConnection = async () => {
    try {
      const allCountries = await GetCountries();
      if (allCountries && allCountries?.length > 0) {
        setConnectedToInternet(true);
      } else {
        setConnectedToInternet(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkCountriesAndInternetConnection();
  }, []);

  const { signupMessage } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [countryId, setCountryId] = useState(0);
  const [countryName, setCountryName] = useState("");
  const [stateId, setStateId] = useState(0);
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (username.trim() == "") {
      return toast.error("Username is required");
    }

    if (email.trim() == "") {
      return toast.error("Email is required");
    }

    if (password.trim() == "") {
      return toast.error("Password is required");
    }

    dispatch(
      signupUser({
        username,
        email,
        password,
        country: countryName,
        state: stateName,
        city: cityName,
        address,
        phoneNumber,
      })
    );

    console.log({ username, email, password });
  };

  if (signupMessage) {
    swal({
      title: signupMessage,
      icon: "success",
    }).then((isOk) => {
      if (isOk) {
        navigate("/login");
      }
    });
  }

  return (
    <main>
      <div className="form-container">
        <h1>Create new account</h1>
        <form onSubmit={formSubmitHandler} className="auth-form">
          <div className="auth-form">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="auth-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/*  */}
          {ConnectedToInternet ? (
            <div id="country-state-city">
              <label>Country</label>
              <CountrySelect
                onChange={(e) => {
                  if (e.id && e.name) {
                    setCountryId(e.id);
                    setCountryName(e.name);
                  } else {
                    setCountryName(e.target.value);
                  }
                }}
                placeHolder="Select Country"
              />
              <label>State</label>
              <StateSelect
                countryid={countryId}
                onChange={(e) => {
                  if ((countryId || countryId == 0) && e.id && e.name) {
                    setStateId(e.id);
                    setStateName(e.name);
                  } else {
                    setStateName(e.target.value);
                  }
                }}
                placeHolder="Select State"
              />
              <label id="address-label" htmlFor="city">
                City
              </label>
              <input
                type="text"
                id="city"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
              />
            </div>
          ) : (
            <>
              <div id="country-at-first" className="auth-form">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  value={countryName}
                  onChange={(e) => setCountryName(e.target.value)}
                />
              </div>

              <div className="auth-form">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                />
              </div>

              <div className="auth-form">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                />
              </div>
            </>
          )}
          {/*  */}
          <div className="auth-form">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="auth-form">
            <label htmlFor="phone">Phone number</label>
            <input
              type="number"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="auth-form">
            <label id="password-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn" type="submit">
            Sign up
          </button>
        </form>
        <p className="login-link">
          Already have an account?
          <Link to="/login"> Login instead</Link>
        </p>
      </div>
    </main>
  );
};

export default SignupPage;
