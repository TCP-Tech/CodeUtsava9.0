import React from "react";

export default function EventCard({ title, speaker, description, date, time, venue, image }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-black/15 backdrop-blur-lg rounded-2xl p-8 shadow-xl w-[90%] max-w-5xl mx-auto ">
      {/* Left side: image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={image}
          alt={speaker}
          className="rounded-xl shadow-lg w-80 h-80 object-cover border-4 border-blue-400"
        />
      </div>

      {/* Right side: content */}
      <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-8 text-white">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-lg text-purple-300 font-semibold mt-2">{speaker}</p>

        <h3 className="mt-4 font-bold text-gray-200">Description</h3>
        <p className="text-gray-300 text-sm mt-1">{description}</p>

        <div className="grid grid-cols-3 gap-4 mt-6 text-sm">
          <div>
            <p className="font-bold text-blue-400">Date</p>
            <p>{date}</p>
          </div>
          <div>
            <p className="font-bold text-blue-400">Time</p>
            <p>{time}</p>
          </div>
          <div>
            <p className="font-bold text-blue-400">Venue</p>
            <p>{venue}</p>
          </div>
        </div>

        <button className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-400 to-pink-500 rounded-lg font-bold shadow-lg opacity-80 hover:opacity-100">
          Register Now
        </button>
      </div>
    </div>
  );
}
