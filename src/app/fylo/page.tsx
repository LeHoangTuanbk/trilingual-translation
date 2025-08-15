const fylo = () => {
  return (
    <div className="font-sans">
      {/* Header */}
      <header className="container flex flex-col items-center justify-between px-6 mx-auto mt-10 md:flex-row md:h-20">
        {/* Dynamic Logo */}
        <div className="w-48 h-20 bg-no-repeat bg-center bg-contain bg-logo-light-mode dark:bg-logo-dark-mode"></div>
        {/* Menu */}
        <div className="flex items-center justify-center space-x-4 md:space-x-10 mt-4 md:mt-0">
          <a href="#features" className="hover:text-accentCyan">
            Features
          </a>
          <a href="#testimonials" className="hover:text-accentCyan">
            Testimonials
          </a>
          <button
            id="theme-toggle"
            className="p-2 text-sm text-gray-500 rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
          >
            <svg
              id="theme-toggle-dark-icon"
              className="hidden w-5 h-5 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
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
          </button>
        </div>
        {/* Dark/Light Mode Button */}
      </header>
    </div>
  );
};

export default fylo;
