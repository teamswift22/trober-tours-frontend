import Image from "next/image";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div
      style={{
        background: "linear-gradient(268deg, #32b3ec 0%, #076087 100%)",
      }}
      className="py-9 px-5 "
    >
      <div className="flex lg:flex-row gap-y-11 lg:gap-y-0  flex-col max-w-7xl mx-auto justify-between items-start">
        <div className="lg:max-w-[298px] space-y-2">
          <div className="flex items-center gap-x-3">
            <Image src="/logo.png" width={50} height={50} alt="Logo" />
            <h2 className="text-[#E8F6FD] font-bold font-sora text-4xl">
              Trober
            </h2>
          </div>
          <p className="text-justify text-xs font-sora text-primary-foreground leading-5">
            Trober makes it possible for tour experts, creatives, and
            entrepreneurs to host trips around the globe with their communities.
          </p>
        </div>
        <div className="flex flex-wrap md:justify-between lg:justify-normal w-full lg:w-fit gap-6 lg:gap-x-4">
          <div className="text-primary-foreground space-y-10">
            <h2 className="font-bold text-lg">Partnerships</h2>
            <ul className="space-y-6 text-sm">
              <li>Agency sign up</li>
              <li>Agency log in</li>
              <li>Solutions</li>
              <li>Affliliate Prtnerships</li>
            </ul>
          </div>
          <div className="text-primary-foreground space-y-10">
            <h2 className="font-bold text-lg">Terms of Use</h2>
            <ul className="space-y-6 text-sm">
              <li>General terms of use</li>
              <li>Privacy policy</li>
              <li>Cookie policy</li>
            </ul>
          </div>
          <div className="text-primary-foreground space-y-10">
            <h2 className="font-bold text-lg">Contact</h2>
            <ul className="space-y-6 text-sm">
              <li className="flex items-center gap-x-2">
                <FaPhoneAlt />
                +233 (0)59 306 5125
              </li>
              <li className="flex items-center gap-x-2">
                <MdEmail /> info@troberapp.com
              </li>
              <li className="flex items-center gap-x-2">
                <FaLocationDot />
                19 Banana St, Accra
              </li>
            </ul>
          </div>
        </div>
        <div className="text-primary-foreground space-y-10">
          <h2 className="font-bold text-lg">Social Media</h2>
          <div className="flex items-center gap-x-4">
            <FaFacebookF />
            <FaTwitter />
            <FaLinkedinIn />
            <FaInstagram />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
