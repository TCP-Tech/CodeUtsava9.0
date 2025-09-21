import React, { Component } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./HomePage.css";
import "../../App.css";
// import IntroAudio from "../../components/introAudio/IntroAudio";
import Section1 from "./sections/section1/Section1";
// import Section2 from "./sections/section2/Section2";
// import Section5 from "./sections/section5/Section5";
import Section6 from "./sections/section6/Section6";
// import Section8 from "./sections/section8/Section8";
// import Section10 from "./sections/section10/Section10";
// import Section11 from "./sections/section11/Section11";
// import Section12 from "./sections/section12/Section12";
// import Section13 from "./sections/section13/Section13";
// import Section14 from "./sections/section14/Section14";
// import Statistics from "../../components/statisticalData/Statistics";
import Footer from "../../components/footer/Footer";
// import Section9 from "./sections/section9/Section9";
// import Guidelines from "../../components/Guidelines/Guidelines";
// import ScrollToTopnew from "../../components/scrollToTop/ScrollToTop";
import About from "./AboutUs";
import FAQ from "../FAQ";
import Events from "../events/Events";

const HomePage = () => {
  return (
    <div className="bg-image">
      <Navbar />
      <div className="container mx-auto">
        <Section1 />
      </div>
      {/* <Statistics /> */}
      <div className="container mx-auto main-container">
        {/* <Section2 />
        <Section12 />
        <Section13 />
        <Section8 />
        <Section11 />
        <Section5 />
        <Guidelines />
        <Section9 /> */}
        <Section6 />
        <About/>
        <FAQ/>
        <Events/>
        {/* <Section9 /> */}
        {/* <Section14 />
        <Section10 /> */}
        {/* <Section15 /> */}
        {/*
          <Section12 />
          <Section13 />*/}
      </div>
      {/* <div className="intro_audio_new_design">
        <IntroAudio />
      </div> */}
      {/* <ScrollToTopnew /> */}
      <div className="codeutsava__footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
