import React from 'react';
import { JobImg } from '../assets';

const About = () => {
  return (
    <div className="container mx-auto flex flex-col gap-8 2xl:gap-14 py-6 ">
      <div className="w-full flex flex-col-reverse md:flex-row gap-10 items-center p-5">
        <div className="w-full md:2/3 2xl:w-2/4">
          <h1 className="text-3xl text-blue-600 font-bold mb-5">About Us</h1>
        </div>
        <img src={JobImg} alt="About" className="w-auto h-[300px]" />
      </div>

      <div className="leading-8 px-5 text-justify">
        <p>
          Welcome to Home Techer Connector, the premier platform dedicated to
          connecting students in Ethiopia with exceptional home tutors. Our goal
          is to facilitate personalized education by bringing together students
          and experienced tutors who are passionate about helping them succeed.
          We understand the importance of quality learning and the need for
          individual attention. Therefore, Home Techer Connector is here to
          provide you with reliable tutors who are committed to your academic
          growth. Whether you're a parent seeking a tutor for your child or a
          student in need of extra support in a specific subject, we've got you
          covered. Our team of tutors is carefully selected to ensure that only
          the best professionals join our platform. They are experts in their
          fields and possess excellent teaching skills. We prioritize the
          success of our students by ensuring that our tutors are highly
          qualified and experienced.
        </p>
      </div>
    </div>
  );
};

export default About;
