import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../redux/apiCalls/userProfileApiCall";

import "./updateProfile.css";

const UpdateProfileModel = ({ setUpdateProfile, userProfile }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(userProfile?.username);
  const [bio, setBio] = useState(userProfile?.bio);
  const [country, setCountry] = useState(userProfile?.country);
  const [state, setState] = useState(userProfile?.state);
  const [city, setCity] = useState(userProfile?.city);
  const [address, setAddress] = useState(userProfile?.address);
  const [phoneNumber, setPhoneNumber] = useState(userProfile?.phoneNumber);
  // const [password, setPassword] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const updatedUser = {
      username,
      bio,
      country,
      state,
      city,
      address,
      phoneNumber,
    };

    dispatch(updateUserProfile(userProfile?._id, updatedUser));
    setUpdateProfile(false);
  };

  return (
    <div className="update-profile">
      <form onSubmit={formSubmitHandler} className="update-profile-form">
        <abbr title="close">
          <span
            onClick={() => setUpdateProfile(false)}
            className="update-profile-form-close"
          >
            X
          </span>
        </abbr>
        <h1 className="update-profile-h1">Update Profile</h1>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="update-profile-input"
        />
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="update-profile-input"
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="update-profile-input"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="update-profile-input"
        />

        <button className="btn update-profile-form-btn" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileModel;
