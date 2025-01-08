"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimationPractice = () => {
  const boxRef = useRef(null);

  useEffect(() => {
    // 創建時間軸
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
    });

    // 連續動畫
    tl.to(boxRef.current, {
      x: 200,
      duration: 1,
      ease: "power2.out",
    })
      .to(boxRef.current, {
        y: 200,
        duration: 1,
        ease: "bounce.out",
      })
      .to(boxRef.current, {
        rotation: 360,
        scale: 1.5,
        duration: 1.5,
      });

    // 清理函數
    return () => {
      tl.kill();
      return undefined;
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        ref={boxRef}
        className="w-20 h-20 bg-blue-500 cursor-pointer"
        onClick={() => {
          // 點擊時的動畫
          gsap.to(boxRef.current, {
            scale: 0.8,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
          });
        }}
      />
    </div>
  );
};

export default AnimationPractice;
