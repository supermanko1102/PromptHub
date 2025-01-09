"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Session } from "next-auth";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, MenuItem, HoveredLink } from "./ui/navbar-menu";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const navbarRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>(
    searchParams.get("query") || ""
  );
  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }

    router.replace(`/?${params.toString()}`);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    handleSearch(inputValue.trim());
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    const navbar = navbarRef.current;

    gsap.set(navbar, {
      opacity: 1,
    });

    // 創建滾動觸發的動畫
    const showNav = gsap.fromTo(
      navbar,
      { opacity: 0 }, // 動畫開始狀態
      {
        opacity: 1,
        duration: 2,
        paused: true,
        ease: "power2.out",
      }
    );

    // 設置 ScrollTrigger
    ScrollTrigger.create({
      trigger: "body",
      start: "40px top",
      end: "+=1",
      onEnter: () => {
        showNav.restart();
      },
      onLeaveBack: () => {
        gsap.set(navbar, { opacity: 1 });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  const placeholders = [
    "我是誰?",
    "我從哪裡來?",
    "我到哪裡去?",
    "我為什麼在這裡?",
    "我為什麼在這裡?",
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 bg-[#1a1b2e] text-white z-50"
      >
        <nav className="container mx-auto px-5 py-3">
          <div className="flex justify-between items-center">
            {/* 左側 Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-[#00ffff] text-2xl font-bold">
                PromptHub
              </Link>
            </div>

            {/* 右側選單 */}
            <div className="flex items-center gap-6">
              <div className=" flex flex-col justify-center items-center px-4">
                <PlaceholdersAndVanishInput
                  placeholders={placeholders}
                  onChange={handleChange}
                  onSubmit={onSubmit}
                  inputValue={inputValue}
                />
              </div>

              <div className="flex items-center gap-6">
                <Menu setActive={setActive}>
                  <MenuItem
                    setActive={setActive}
                    active={active}
                    item={"AI 平台"}
                  >
                    <div className="flex flex-col space-y-4 text-sm">
                      <HoveredLink href="/web-dev">ChatGPT</HoveredLink>
                      <HoveredLink href="/interface-design">
                        Midjourney
                      </HoveredLink>
                      <HoveredLink href="/seo">Stable Diffusion</HoveredLink>
                      <HoveredLink href="/branding">Branding</HoveredLink>
                    </div>
                  </MenuItem>
                </Menu>
                <Link href="#" className="hover:text-[#00ffff]">
                  關於
                </Link>
                <Link href="#" className="hover:text-[#00ffff]">
                  聯絡我們
                </Link>

                {/* 保留原有的登入登出功能 */}
                {session?.user ? (
                  <div className="flex items-center gap-4">
                    <span>{session.user.name}</span>
                    <button
                      onClick={() => onSignOut()}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      登出
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onSignIn()}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    登入
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* 次導航欄 */}
        <div className="border-t border-gray-700">
          <div className="container mx-auto px-5">
            <div className="flex items-center gap-6 py-2 text-sm">
              <Link
                href="#"
                className="flex items-center gap-2 hover:text-[#00ffff]"
              >
                <span>Digital Marketing</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 hover:text-[#00ffff]"
              >
                <span>Drawings</span>
              </Link>
              {/* ... 其他分類連結 ... */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedNavbar;
