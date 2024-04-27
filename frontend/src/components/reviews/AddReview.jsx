import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import "./addReview.css";
import { createReview } from "../../redux/apiCalls/reviewApiCall";

const AddReview = ({ postId }) => {
  const [review, setReview] = useState("");
  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (review.trim() == "") {
      return toast.error("Can not post an empty review");
    }
    setReview("");
    dispatch(createReview({ postId, text: review }));
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <textarea
        rows={1}
        type="text"
        placeholder="Add a review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button className="btn">Add review</button>
    </form>
  );
};

export default AddReview;
