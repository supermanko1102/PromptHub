"use client";

import { useEffect } from "react";
import gsap from "gsap";

const Hero = () => {
  useEffect(() => {
    // cube 動畫
    gsap.to(".cube", {
      x: 750,
      duration: 3,
    });
  }, []);

  return (
    <div className="start">
      <div className="cube-inner"></div>
    </div>
  );
};

export default Hero;
