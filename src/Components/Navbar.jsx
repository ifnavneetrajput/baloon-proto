import baloonWordMark from "../assets/baloon_word_mark_.svg";

const Navbar = () => {
  return (
    <header className="px-6 py-4">
      <img src={baloonWordMark} alt="logo" className="h-8" />
    </header>
  );
};

export default Navbar;
