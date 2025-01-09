"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Session } from "next-auth";
import { motion, useScroll } from "framer-motion";
import { Menu, MenuItem, HoveredLink } from "./ui/navbar-menu";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { useRouter, useSearchParams } from "next/navigation";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

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
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

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
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 40);
    });
  }, [scrollY]);

  const placeholders = [
    "我是誰?",
    "我從哪裡來?",
    "我到哪裡去?",
    "我為什麼在這裡?",
    "我為什麼在這裡?",
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 bg-[#1a1b2e] text-white z-50"
        initial={{ opacity: 1 }}
        animate={
          isScrolled
            ? {
                opacity: [0, 1],
                y: [-20, 3, 0],
                scale: [0.97, 1.02, 1],
              }
            : {
                opacity: 1,
                y: 0,
                scale: 1,
              }
        }
        transition={{
          duration: 0.7,
          times: [0, 0.8, 1],
          ease: "easeOut",
        }}
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
                  // <div className="flex items-center gap-4">
                  //   <span>{session.user.name}</span>
                  //   <button
                  //     onClick={() => onSignOut()}
                  //     className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  //   >
                  //     登出
                  //   </button>
                  // </div>
                  <>
                    <span>{session.user.name}</span>
                    <HoverBorderGradient
                      containerClassName="rounded-full"
                      as="button"
                      className="  bg-transparent text-white flex items-center space-x-2 "
                      onClick={() => onSignOut()}
                    >
                      <span>登出</span>
                    </HoverBorderGradient>
                  </>
                ) : (
                  <>
                    <HoverBorderGradient
                      containerClassName="rounded-full"
                      as="button"
                      className="  bg-transparent text-white flex items-center space-x-2 "
                      onClick={() => onSignIn()}
                    >
                      <span>登入</span>
                    </HoverBorderGradient>
                  </>
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
                <span>軟體工程師</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 hover:text-[#00ffff]"
              >
                <span>藝術作者</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 hover:text-[#00ffff]"
              >
                <span>數位行銷</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 hover:text-[#00ffff]"
              >
                <span>建築</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 hover:text-[#00ffff]"
              >
                <span>汽車</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 hover:text-[#00ffff]"
              >
                <span>圖紙</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedNavbar;
