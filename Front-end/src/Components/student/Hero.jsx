import React from "react";
import { assets } from "../../assets/assets";

function Hero() {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-linear-to-b from-cyan-100/70">
      <h1
        className="
                text-3xl               
                sm:text-4xl             
                md:text-4xl            
                lg:text-5xl            
                font-bold 
                text-gray-800 
                relative 
                max-w-3xl 
                mx-auto
                space-x-5
              "
      >
        Empower your future with the 
        courses designed to
        <span className="text-blue-600"> fit your choice.</span>
        <img
          src={assets.sketch}
          alt="sketch"
          className="md:block hidden absolute -bottom-7 right-0"
        />
      </h1>

      <p className="md:block hidden text-gray-500 max-w-2xl mx-auto">
        We bring together world-class instructors, interactive content, and a
        supportive community to help you achieve your personal and professional
        goals.
      </p>

      <p className="md:hidden text-gray-500 max-w-sm mx-auto">
        We bring together world-class instructors , to achieve your goals
      </p>
    </div>
  );
}

export default Hero;
