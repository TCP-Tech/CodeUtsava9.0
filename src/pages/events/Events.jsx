import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import bgVideo from "../../assets/background/carnival_bg.mp4";

import EventCard from "./EventCard.jsx";

export default function Events() {
  const events = [
    {
      title: "Speaker Session 1",
      speaker: "abc",
      description: "####",
      date: "8th Oct",
      time: "10:30 AM",
      venue: "E-Hall, NIT Raipur",
      image: "/speaker.png",
    },
    {
      title: "Speaker Session 2",
      speaker: "abc",
      description: "####",
      date: "8th Oct",
      time: "10:30 AM",
      venue: "E-Hall, NIT Raipur",
      image: "/speaker.png",
    },
    {
      title: "Speaker Session 3",
      speaker: "abc",
      description: "####",
      date: "8th Oct",
      time: "10:30 AM",
      venue: "E-Hall, NIT Raipur",
      image: "/speaker.png",
    },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center py-12 "
      
    >
        {/* Background video */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="fixed inset-0 w-full h-full object-cover -z-10"
              >
                <source src={bgVideo} type="video/mp4" />
              </video>
        
              {/* Black overlay */}
          <div className="absolute inset-0 bg-black/40 -z-10"></div>
      <h1 className=" drop-shadow-lg mb-10 inline-block px-6 py-2  text-sky-200 text-6xl font-extrabold rounded-lg shadow-md">
         Our Events
      </h1>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={50}
        slidesPerView={1}
        className="w-full max-w-6xl"
      >
        {events.map((event, index) => (
          <SwiperSlide key={index}>
            <EventCard {...event} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
