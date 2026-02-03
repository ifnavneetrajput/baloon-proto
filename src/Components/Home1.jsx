import { useNavigate } from "react-router-dom";

const Home1 = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col justify-center min-h-[calc(100vh-4rem)] px-6 md:px-24">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          Invest in <span className="text-purple-600">growth</span> that
          supports you.
        </h1>

        <p className="mt-4 text-gray-600 max-w-xl mx-auto text-sm md:text-base">
          Build capabilities and clarity through hobbies designed for
          sustainable personal growth.
        </p>

        <button
          onClick={() => navigate("/signup")}
          className="mt-6 px-8 py-2.5 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition shadow-lg shadow-purple-200"
        >
          Explore
        </button>
      </div>
    </main>
  );
};

export default Home1;
