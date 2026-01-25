import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaHeart,
  FaCompass,
  FaTrophy,
  FaVoteYea,
  FaHandsHelping,
  FaArrowRight,
} from "react-icons/fa";

import Favicon from "../assets/favicon.ico";



const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-gray-900">
  
      <section className="mb-20">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-12">
          <div className="flex items-center gap-4 min-w-[220px]">
            <img src={Favicon} alt="Baloon" className="w-20 h-20" />
            <div className="leading-tight">
              <h2 className="text-pink-500 font-bold text-4xl">baloon</h2>
              <span className="text-gray-500 text-lg">Live Events</span>
            </div>
          </div>

          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-semibold leading-snug">
              Where Communities Thrive,{" "}
              <span className="font-bold">Talents Shine</span>
            </h1>

            <p className="mt-3 text-gray-600 text-sm leading-relaxed">
              A platform designed to help you build communities, discover your
              hobbies, prioritize mental wellness, and showcase your
              co-curricular skills through exciting competitions and live
              events.
            </p>
          </div>
        </div>
      </section>


      <section className="mb-24">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-pink-500 hover:text-pink-600 transition">
            What We Offer
          </h2>
          <p className="text-gray-600 text-sm">
            Four pillars that define your Baloon journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {[
            {
              icon: <FaUsers />,
              title: "Community Building",
              desc: "Connect with like-minded people and grow together",
            },
            {
              icon: <FaCompass />,
              title: "Discover Hobbies",
              desc: "Explore new interests and develop skills that define you",
            },
            {
              icon: <FaHeart />,
              title: "Mental Wellness",
              desc: "A positive environment focused on your well-being",
            },
            {
              icon: <FaTrophy />,
              title: "Competition & Events",
              desc: "Showcase your skills through exciting live events",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group flex gap-5 transition-all duration-300 hover:-translate-y-2"
            >
              <div
                className="w-12 h-12 rounded-xl bg-pink-500 text-white text-xl flex items-center justify-center
                              transition-all duration-300
                              group-hover:scale-110 group-hover:shadow-lg"
              >
                {item.icon}
              </div>

              <div>
                <h3
                  className="font-semibold text-gray-900 mb-1
                               transition-all duration-300
                               group-hover:scale-[1.03]"
                >
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm max-w-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

 
      <section className="mb-24">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-pink-500 hover:text-pink-600 transition">
            Current Features
          </h2>
          <p className="text-gray-600 text-sm">
            Experience live reel competition and more
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
          {[
            {
              icon: <FaTrophy />,
              title: "Live Reel Battles",
              desc: "Watch creators compete in real time",
            },
            {
              icon: <FaVoteYea />,
              title: "Vote & Decide",
              desc: "You decide the winner",
            },
            {
              icon: <FaHandsHelping />,
              title: "Support Creators",
              desc: "Help talents rise to the top",
            },
            {
              icon: <FaCompass />,
              title: "Skill Development",
              desc: "Learn and grow with the community",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group flex gap-5 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="w-12 h-12 rounded-xl bg-pink-500 text-white text-xl flex items-center justify-center
                              transition-all duration-300
                              group-hover:scale-110 group-hover:shadow-lg"
              >
                {item.icon}
              </div>

              <div>
                <h3
                  className="font-semibold text-gray-900 mb-1
                               transition-all duration-300
                               group-hover:scale-[1.03]"
                >
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm max-w-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

   
      <section className="mb-24">
        <h2 className="text-2xl font-bold text-pink-500 mb-16">
          Your Journey Starts Here
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-20 gap-x-24">
          {[
            "Choose Your Journey",
            "Explore Content",
            "Cast Your Vote",
            "Join the Community",
          ].map((step, idx) => (
            <div
              key={idx}
              className="group flex gap-4 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-semibold
                              transition-transform duration-300
                              group-hover:scale-110"
              >
                {idx + 1}
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{step}</h3>
                <p className="text-gray-600 text-sm">
                  Take the next step in your journey
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>


      <section className="mb-24">
        <h2 className="text-2xl font-bold text-pink-500 mb-10">
          Why Choose Baloon
        </h2>

        <ul className="space-y-6 max-w-3xl">
          {[
            "Safe space for creative expression and growth",
            "Supportive community that celebrates your talents",
            "Real opportunities to showcase your skills",
            "Focus on mental wellness and personal development",
          ].map((item, idx) => (
            <li
              key={idx}
              className="group flex gap-4 items-start transition-all duration-300 hover:translate-x-1"
            >
              <div
                className="w-6 h-6 rounded-full border-2 border-pink-500 text-pink-500 flex items-center justify-center text-sm font-bold
                              transition-transform duration-300
                              group-hover:scale-110"
              >
                ✓
              </div>
              <p className="text-gray-700 text-sm">{item}</p>
            </li>
          ))}
        </ul>
        <div className="flex justify-end mt-16">
          <button
            onClick={() => navigate("/participate")}
            className="group bg-pink-500 hover:bg-pink-600 transition
                       text-white px-8 py-3 rounded-full text-sm font-semibold
                       inline-flex items-center gap-3"
          >
            Start Your Journey
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
