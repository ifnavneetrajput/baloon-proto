import JourneyCard from "./JourneyCard";
import BaloonLogo from "../assets/Baloon_Logo_svg-07.svg";
import Lottie from "lottie-react";
import loadingSoonAnimation from "../assets/LOADING-SOON-ANIMATION.json";

const journeys = [
  {
    title: "Reel Competition",
    tag: "Community",
    description: "Vote for your favorite reels and compete with creators",
    active: true,
  },
  {
    title: "AI & Creativity",
    tag: "Community",
    description: "Explore AI tools for art, writing, and design",
    active: false,
  },
  {
    title: "Music",
    tag: "Community",
    description: "Discover music lovers and creators",
    active: false,
  },
  {
    title: "Singing",
    tag: "Community",
    description: "Showcase your voice and connect with singers",
    active: false,
  },
  {
    title: "Cricket",
    tag: "Sports",
    description: "Join cricket fans, polls, and match discussions",
    active: false,
  },
  {
    title: "Fitness & Wellness",
    tag: "Health",
    description: "Build healthy habits with a supportive community",
    active: false,
  },
  {
    title: "Photography",
    tag: "Creative",
    description: "Share photos, get feedback, and improve skills",
    active: false,
  },
  {
    title: "Gaming",
    tag: "Entertainment",
    description: "Connect with gamers and explore trending games",
    active: false,
  },
  {
    title: "Startups & Tech",
    tag: "Career",
    description: "Discuss ideas, products, and tech trends",
    active: false,
  },
  {
    title: "Travel & Culture",
    tag: "Lifestyle",
    description: "Share experiences, places, and travel stories",
    active: false,
  },
  {
    title: "Mental Health",
    tag: "Well-being",
    description: "Safe space for reflection and growth",
    active: false,
  },
  {
    title: "Content Creators",
    tag: "Community",
    description: "Learn growth, editing, and creator strategies",
    active: false,
  },
];

const JourneyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">

      <div className="text-center mb-8">
        <img
          src={BaloonLogo}
          alt="Baloon logo"
          className="mx-auto mb-4 w-14 h-14"
        />

        <h1 className="text-2xl font-bold text-pink-600">
          Choose Your Journey
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Find your community, explore hobbies, and prioritize your well-being.
          Select a cohort to get started.
        </p>
      </div>

      <div
        className="grid gap-6 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          max-w-6xl mx-auto"
      >
        {journeys.map((journey, index) => (
          <JourneyCard key={index} {...journey} />
        ))}
      </div>


      <div className="mt-14 flex flex-col items-center justify-center text-center">
        <div className="w-[180px] h-[180px] opacity-80 mt-10">
          <Lottie
            animationData={loadingSoonAnimation}
            loop
            autoplay
            renderer="svg"
          />
        </div>

       
      </div>
    </div>
  );
};


export default JourneyPage;
