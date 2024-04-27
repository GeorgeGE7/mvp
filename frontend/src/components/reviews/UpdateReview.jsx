import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import "./updateReview.css";
import { updateReview } from "../../redux/apiCalls/reviewApiCall";

const UpdateReview = ({ reviewToBeUpdated, setUpdateReview }) => {
  const dispatch = useDispatch();
  const [review, setReview] = useState(reviewToBeUpdated?.text);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (review.trim() == "") return toast.error("Can not be empty");
    dispatch(updateReview(reviewToBeUpdated?._id, { text: review }));
    setUpdateReview(false);
  };

  return (
    <div className="update-review">
      <form onSubmit={formSubmitHandler} className="update-review-form">
        <abbr title="close">
          <span
            onClick={() => setUpdateReview(false)}
            className="update-review-form-close"
          >
            X
          </span>
        </abbr>
        <h1 className="update-review-h1">Edit review</h1>
        <textarea
          type="text"
          rows={1}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="update-review-input"
        />
        <button className="btn" type="submit">
          Edit review
        </button>
      </form>
    </div>
  );
};

export default UpdateReview;
