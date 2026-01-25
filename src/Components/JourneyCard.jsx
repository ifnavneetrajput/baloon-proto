import { useNavigate } from "react-router-dom";
import BaloonLogo from "../assets/Baloon_Logo_svg-07.svg";

const JourneyCard = ({ title, description, tag, active }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!active) return;
    navigate("/main");
  };

  return (
    <div
      onClick={handleClick}
      className={`rounded-2xl overflow-hidden border bg-white transition
        ${active ? "cursor-pointer hover:shadow-lg" : "opacity-50 cursor-not-allowed"}
      `}
    >
   
      <div className="h-40 bg-gradient-to-br from-pink-500 to-rose-400 flex items-center justify-center relative">
        {active && (
          <span className="absolute top-3 left-3 text-xs bg-white text-pink-600 px-2 py-1 rounded-full font-medium">
            Active Now
          </span>
        )}

        <div className="bg-white/90 p-3 rounded-2xl shadow-sm">
          <img
            src={BaloonLogo}
            alt="Baloon community"
            className="w-16 h-16 object-contain brightness-110 contrast-125"
          />
        </div>
      </div>


      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

        <span className="inline-block mt-1 text-xs font-medium text-pink-600 bg-pink-100 px-2 py-0.5 rounded">
          {tag}
        </span>

        <p className="mt-2 text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default JourneyCard;
