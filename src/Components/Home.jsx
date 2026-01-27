import React, { useEffect, useRef, useState } from "react";
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


const useReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

const Home = () => {
  const navigate = useNavigate();

  const [heroRef, heroVisible] = useReveal();
  const [offerLeftRef, offerLeftVisible] = useReveal();
  const [offerRightRef, offerRightVisible] = useReveal();
  const [featureLeftRef, featureLeftVisible] = useReveal();
  const [featureRightRef, featureRightVisible] = useReveal();

  return (
    <div className="max-w-6xl mx-auto px-6 text-gray-900">

      <section
        ref={heroRef}
        className={`py-20 transition-all duration-700 ease-out
          ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
        `}
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex items-center gap-4">
            <img src={Favicon} alt="Baloon" className="w-20 h-20" />
            <div>
              <h2 className="text-pink-500 font-bold text-4xl">baloon</h2>
              <span className="text-gray-500 text-lg">Live Events</span>
            </div>
          </div>

          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl font-semibold leading-snug">
              Where Communities Thrive,{" "}
              <span className="font-bold">Talents Shine</span>
            </h1>

            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              Build communities, explore hobbies, and showcase your talent
              through live competitions and events.
            </p>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => navigate("/journey")}
                className="bg-pink-500 text-white px-6 py-3 rounded-full text-sm font-semibold
                           hover:bg-pink-600 transition"
              >
                Explore Journeys
              </button>

              <button
                onClick={() => navigate("/participate")}
                className="border border-pink-500 text-pink-500 px-6 py-3 rounded-full text-sm font-semibold
                           hover:bg-pink-50 transition"
              >
                Join Competition
              </button>
            </div>
          </div>
        </div>
      </section>

    
      <section className="py-20 bg-gray-50 rounded-3xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div
            ref={offerLeftRef}
            className={`transition-all duration-700 ease-out
              ${offerLeftVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}
            `}
          >
            <h2 className="text-2xl font-bold text-pink-500 mb-4">
              What We Offer
            </h2>
            <p className="text-gray-600 text-sm max-w-md">
              Four core pillars that define the Baloon experience.
            </p>
          </div>

          <div
            ref={offerRightRef}
            className={`grid grid-cols-1 sm:grid-cols-2 gap-10
              transition-all duration-700 ease-out
              ${offerRightVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}
            `}
          >
            {[
              { icon: <FaUsers />, title: "Community" },
              { icon: <FaCompass />, title: "Hobbies" },
              { icon: <FaHeart />, title: "Wellness" },
              { icon: <FaTrophy />, title: "Competitions" },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-pink-500 text-white flex items-center justify-center text-xl">
                  {item.icon}
                </div>
                <h3 className="font-semibold mt-2">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div
            ref={featureLeftRef}
            className={`transition-all duration-700 ease-out
              ${featureLeftVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}
            `}
          >
            <h2 className="text-2xl font-bold text-pink-500 mb-4">
              Current Features
            </h2>
            <p className="text-gray-600 text-sm max-w-md">
              Experience live reel competitions and community voting.
            </p>
          </div>

          <div
            ref={featureRightRef}
            className={`grid grid-cols-1 sm:grid-cols-2 gap-10
              transition-all duration-700 ease-out
              ${featureRightVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}
            `}
          >
            {[
              { icon: <FaTrophy />, title: "Live Battles" },
              { icon: <FaVoteYea />, title: "Vote" },
              { icon: <FaHandsHelping />, title: "Support Creators" },
              { icon: <FaCompass />, title: "Skill Growth" },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-pink-500 text-white flex items-center justify-center text-xl">
                  {item.icon}
                </div>
                <h3 className="font-semibold mt-2">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section className="py-20 flex justify-center">
        <button
          onClick={() => navigate("/participate")}
          className="group bg-pink-500 hover:bg-pink-600 transition
                     text-white px-10 py-4 rounded-full text-sm font-semibold
                     inline-flex items-center gap-3"
        >
          Start Your Journey
          <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </section>
    </div>
  );
};

export default Home;
