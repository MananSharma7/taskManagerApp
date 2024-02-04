import React from "react";

const About = () => {
  return (
    <div className="container mx-auto size-9/12 my-10 text-center">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-500 from-cyan-600">
          Manan Sharma
        </span>
      </h1>
      <p className="text-lg font-normal text-gray-500 lg:text-xl">
        I am seeking opportunities to apply my skills and gain experience in the
        industry. With expertise in front-end development, UI/UX design and
        back-end development. I am well-equipped to contribute to the
        development of high-quality web solutions.
      </p>
      <p className="text-lg font-normal text-gray-500 lg:text-xl mt-3 mb-5">
        Focus: ReactJS, NodeJS, MongoDB, ExpressJS
      </p>
      <p className="text-lg font-normal text-gray-500 lg:text-xl">
        GitHub:
        <a
          href="https://github.com/MananSharma7"
          className="font-medium text-blue-600 hover:text-blue-700 hover:underline ml-1"
        >
          https://github.com/MananSharma7
        </a>
      </p>
    </div>
  );
};

export default About;
