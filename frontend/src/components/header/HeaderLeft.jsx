import { Link } from "react-router-dom";
import { MdPets } from "react-icons/md";

const HeaderLeft = () => {
  return (
    <>
      <Link to="/" id="logo-text">
        Pets shop
        <span>
          <MdPets />
        </span>
      </Link>
    </>
  );
};

export default HeaderLeft;
