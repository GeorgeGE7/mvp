const MobileMenuBtn = ({ toggle, setToggle }) => {
  return (
    <button onClick={() => setToggle((prev) => !prev)} id="mobile-menu-btn">
      {!toggle ? (
        <>
          <span></span>
          <span></span>
          <span></span>
        </>
      ) : (
        <p id="closeNav">x</p>
      )}
    </button>
  );
};

export default MobileMenuBtn;
