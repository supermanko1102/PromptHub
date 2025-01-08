"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Session } from "next-auth";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 註冊 ScrollTrigger 插件
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedNavbarProps {
  session: Session | null;
  onSignOut: () => Promise<void>;
  onSignIn: () => Promise<void>;
}

const AnimatedNavbar = ({
  session,
  onSignOut,
  onSignIn,
}: AnimatedNavbarProps) => {
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const navbar = navbarRef.current;

    // 初始設置：導航欄隱藏
    gsap.set(navbar, {
      yPercent: -100,
      opacity: 0,
    });

    // 創建滾動觸發的動畫
    const showNav = gsap.to(navbar, {
      yPercent: 0,
      opacity: 1,
      duration: 0.6,
      paused: true,
      ease: "power2.out",
    });

    // 設置 ScrollTrigger
    ScrollTrigger.create({
      start: "top top-=100",
      end: 99999,
      onUpdate: (self) => {
        // 向下滾動時顯示，向上滾動時隱藏
        if (self.direction === 1) {
          showNav.play();
        } else {
          showNav.reverse();
        }
      },
    });

    // 清理函數
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={navbarRef}
      className="fixed top-0 left-0 right-0 px-5 py-3 bg-white shadow-sm font-work-sans text-black z-50"
    >
      <nav className="flex justify-between items-center">
        <div>
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={100} height={36} />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {session && session.user ? (
            <>
              <Link href="/startup/create">
                <span className="hover:scale-105 transition-transform">
                  建立
                </span>
              </Link>
              <form action={onSignOut}>
                <button
                  type="submit"
                  className="hover:scale-105 transition-transform"
                >
                  登出
                </button>
              </form>
              <Link href={`/user/${session.user.id}`}>
                <span className="hover:scale-105 transition-transform">
                  {session.user.name}
                </span>
              </Link>
            </>
          ) : (
            <form action={onSignIn}>
              <button
                type="submit"
                className="hover:scale-105 transition-transform"
              >
                登入
              </button>
            </form>
          )}
        </div>
      </nav>
    </div>
  );
};

export default AnimatedNavbar;
