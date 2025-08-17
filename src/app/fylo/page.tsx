"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const featureItemRow1 = [
  {
    imgSrc: "fylo/images/icon-access-anywhere.svg",
    title: "Access your files anywhere",
    description:
      "The ability to use a smartphone, tablet, or computer to access your account means your files follow you everywhere.",
  },
  {
    imgSrc: "fylo/images/icon-security.svg",
    title: "Security you can trust",
    description:
      "2-factor authentication and user-controlled encryption are just a couple of the security features we allow to help secure your files.",
  },
];

const featureItemRow2 = [
  {
    imgSrc: "fylo/images/icon-collaboration.svg",
    title: "Real-time collaboration",
    description:
      "Securely share files and folders with friends, family and colleagues for live collaboration. No email attachments required.",
  },
  {
    imgSrc: "fylo/images/icon-any-file.svg",
    title: "Store any type of file",
    description:
      "Whether you're sharing holidays photos or work documents, Fylo has you covered allowing for all file types to be securely stored and shared.",
  },
];

const testimonialsInfo = [
  {
    content:
      "Fylo has improved our team productivity by an order of magnitude. Since making the switch our team has become a well-oiled collaboration machine.",
    user: {
      image: "fylo/images/profile-1.jpg",
      name: "Satish Patel",
      role: "Founder & CEO, Huddle",
    },
  },
  {
    content:
      "Fylo has given us centralized storage with great security. The security features give me peace of mind that our company data is protected.",
    user: {
      image: "fylo/images/profile-2.jpg",
      name: "Bruce McKenzie",
      role: "Founder & CEO, Huddle",
    },
  },
  {
    content:
      "Fylo has the best team I've ever worked with. They understand what we need and always deliver exactly what we're looking for.",
    user: {
      image: "fylo/images/profile-3.jpg",
      name: "Iva Boyd",
      role: "Founder & CEO, Huddle",
    },
  },
];

const themeConst = {
  dark: "dark",
  light: "light",
} as const;

export type themeValue = (typeof themeConst)[keyof typeof themeConst];

const Fylo = () => {
  const [theme, setTheme] = useState<themeValue>(themeConst.light);
  useEffect(() => {
    const theme = localStorage.getItem("color-theme");
    const preferColorScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (theme === themeConst.dark || (!theme && preferColorScheme)) {
      document.documentElement.classList.add(themeConst.dark);
      setTheme(themeConst.dark);
    } else {
      document.documentElement.classList.remove(themeConst.dark);
      setTheme(themeConst.light);
    }
  }, []);
  const toggleMode = () => {
    if (theme === themeConst.dark) {
      setTheme(themeConst.light);
      localStorage.setItem("color-theme", themeConst.light);
      document.documentElement.classList.remove(themeConst.dark);
    } else {
      setTheme(themeConst.dark);
      localStorage.setItem("color-theme", themeConst.dark);
      document.documentElement.classList.add(themeConst.dark);
    }
  };

  return (
    <div className="font-sans">
      {/* Header */}
      <header className="container flex flex-col items-center justify-between px-6 mx-auto mt-10 md:flex-row md:h-20">
        {/* Dynamic Logo */}
        <div className="w-48 h-20 bg-center bg-no-repeat bg-contain bg-logo-light-mode dark:bg-logo-dark-mode"></div>
        {/* Menu */}
        <div className="flex items-center justify-center mt-4 space-x-4 md:space-x-10 md:mt-0">
          <a href="#features" className="hover:text-accentCyan">
            Features
          </a>
          <a href="#testimonials" className="hover:text-accentCyan">
            Testimonials
          </a>
          {/* Dark/Light Mode Button */}
          <button
            id="theme-toggle"
            className="p-2 text-sm text-gray-500 rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
            onClick={toggleMode}
          >
            {theme === themeConst.dark ? (
              <svg
                id="theme-toggle-dark-icon"
                className="w-5 h-5 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
            ) : (
              <svg
                id="theme-toggle-light-icon"
                className="w-5 h-5 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Hero section */}
      <section
        id="hero"
        className="bg-bottom bg-no-repeat bg-contain bg-curvy-light-mode dark:bg-curvy-dark-mode"
      >
        <div className="container px-6 mx-auto text-center md:pt-20 pb-52">
          <Image
            src="/fylo/images/illustration-intro.png"
            alt="File storage illustration"
            width={500}
            height={400}
            className="mx-auto"
          />
          <h1 className="max-w-2xl mx-auto mb-10 text-3xl font-bold leading-normal mt-14 md:text-4xl">
            All your files in one secure location, assessible anywhere.
          </h1>
          <p className="max-w-sm mx-auto mb-10 text-sm md:max-w-xl md:text-lg">
            Fylo stores all your most important files in one secure location.
            Access them wherever you need, share and collaborate with friends
            family, and co-workers.
          </p>
          <button className="p-3 rounded-full w-52 bg-accentCyan hover:scale-95">
            Get started
          </button>
        </div>
      </section>

      {/* Feature section */}
      <section id="features" className="pt-12 bg-gray-50 dark:bg-darkBlue1">
        {/* Feature container */}
        <div className="container px-6 pb-32 mx-auto">
          {/* First Row */}
          <div className="flex flex-col mb-24 space-y-24 text-center md:flex-row md:space-y-0">
            {featureItemRow1.map((item) => {
              return (
                <div
                  className="flex flex-col items-center space-y-2 md:w-1/2"
                  key={item.imgSrc}
                >
                  <div className="flex items-center justify-center h-24 mb-6">
                    <Image
                      src={`/${item.imgSrc}`}
                      alt={item.title}
                      width={80}
                      height={80}
                    />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <div className="max-w-md">{item.description}</div>
                </div>
              );
            })}
          </div>
          {/* Second Row */}
          <div className="flex flex-col space-y-24 text-center md:flex-row md:space-y-0">
            {featureItemRow2.map((item) => {
              return (
                <div
                  className="flex flex-col items-center space-y-2 md:w-1/2"
                  key={item.imgSrc}
                >
                  <div className="flex items-center justify-center h-24 mb-6">
                    <Image
                      src={`/${item.imgSrc}`}
                      alt={item.title}
                      width={80}
                      height={80}
                    />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <div className="max-w-md">{item.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Productive section */}
      <section id="productive" className="bg-white dark:bg-darkBlue">
        {/* Productive container */}
        <div className="container flex flex-col items-center px-6 pt-24 pb-32 mx-auto md:flex-row md:space-x-16">
          {/* Image */}
          <div className="md:w-1/2">
            <Image
              src="/fylo/images/illustration-stay-productive.png"
              alt="Stay productive illustration"
              width={600}
              height={400}
              className="mb-10"
            />
          </div>
          {/* Content */}
          <div className="flex flex-col items-start md:w-1/2">
            <div className="flex flex-col space-y-5">
              <h4 className="max-w-md text-xl font-bold md:text-4xl">
                Stay productive, wherever you are
              </h4>
              <p className="text-md md:text-lg">
                Never let location be an issue when accessing your files. Fylo
                has you covered for all of your file storage needs.
              </p>
            </div>
            <div className="block mt-4">
              <a
                href="#"
                className="border-b border-accentCyan text-accentCyan"
              >
                See how Fylo works
                <Image
                  src="/fylo/images/icon-arrow.svg"
                  alt="Arrow icon"
                  width={20}
                  height={20}
                  className="inline pb-2 ml-1"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section id="testimonials" className="bg-gray-50 dark:bg-darkBlue">
        {/* Testimonial Container */}
        <div className="container px-6 pt-12 mx-auto pb-80 mb:pb-96">
          {/* Boxes Container */}
          <div className="relative flex flex-col w-full space-y-6 md:flex-row md:space-y-0 md:space-x-12">
            {/* Quotes Image */}
            <Image
              src="/fylo/images/bg-quotes.png"
              alt="Quote decoration"
              width={80}
              height={60}
              className="absolute w-10 left-1 -top-2 md:-top-16 md:w-20"
            />
            {testimonialsInfo.map((item) => {
              return (
                <div
                  className="flex flex-col p-10 space-y-6 bg-gray-100 rounded-lg dark:bg-darkBlue3 md:w-1/3"
                  key={item.user.image}
                >
                  <p className="text-sm leading-5 md:text-lg">{item.content}</p>
                  <div className="flex space-x-4">
                    <Image
                      src={`/${item.user.image}`}
                      alt={`${item.user.name} profile`}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h5 className="text-sm font-semibold">
                        {item.user.name}
                      </h5>
                      <p className="text-xs font-extralight">
                        {item.user.role}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Early access today */}
      <section
        id="early-access"
        className="relative px-6 dark:bg-darkBlue2 md:px-0"
      >
        <div className="relative max-w-4xl p-10 px-6 mx-auto space-y-6 text-center bg-gray-200 rounded-lg -top-40 dark:bg-darkBlue1 md:px-16">
          <h5 className="text-2xl font-bold">Get early access today</h5>
          <p className="text-sm">
            It only takes a minute to sign up and our free starter tier is
            extremely generous. If you have any questions, our support team
            would be happy to help you.
          </p>
          <div className="flex flex-col items-start space-y-6 md:flex-row md:space-y-0 md:space-x-6">
            <div className="w-full md:flex-1">
              <input
                type="text"
                className="w-full px-10 py-3 rounded-full focus:outline-none"
                placeholder="email@example.com"
              />
            </div>
            <button className="w-full p-3 px-6 rounded-full bg-accentCyan md:w-56 hover:scale-95">
              Get Started For Free
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white bg-darkBlue2">
        <div className="container px-5 pt-12 pb-10 mx-auto">
          <div className="flex flex-col justify-between space-y-24 md:flex-row md:space-y-0">
            {/* Email & Phone */}
            <div className="mt-10 space-y-6">
              <div className="flex items-center space-x-3 md:-mt-10">
                <div className="w-6">
                  <Image
                    src="/fylo/images/icon-phone.svg"
                    alt="Phone icon"
                    width={24}
                    height={24}
                    className="scale-10"
                  />
                </div>
                <div>+1-543-123-4567</div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6">
                  <Image
                    src="/fylo/images/icon-email.svg"
                    alt="Email icon"
                    width={24}
                    height={24}
                    className="scale-10"
                  />
                </div>
                <div>example@gmail.com</div>
              </div>
            </div>
            {/* Menus */}
            <div className="flex flex-col space-y-10 text-xl md:text-base md:space-x-20 md:space-y-0 md:flex-row">
              <div className="flex flex-col space-y-3 ">
                <a href="#">About</a>
                <a href="#">Jobs</a>
                <a href="#">Press</a>
                <a href="#">Blog</a>
              </div>
              <div className="flex flex-col space-y-3">
                <a href="#">Contact Us</a>
                <a href="#">Terms</a>
                <a href="#">Privacy</a>
              </div>
            </div>
            {/* Social */}
            <div className="flex justify-center pb-10 space-x-3">
              <a href="#">
                <Image
                  src="/fylo/images/facebook.svg"
                  alt="Facebook"
                  width={40}
                  height={40}
                  className="p-2 rounded-full bg-darkBlue ficon"
                />
              </a>
              <a href="#">
                <Image
                  src="/fylo/images/twitter.svg"
                  alt="Twitter"
                  width={40}
                  height={40}
                  className="p-2 rounded-full bg-darkBlue ficon"
                />
              </a>
              <a href="#">
                <Image
                  src="/fylo/images/instagram.svg"
                  alt="Instagram"
                  width={40}
                  height={40}
                  className="p-2 rounded-full bg-darkBlue ficon"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Fylo;
