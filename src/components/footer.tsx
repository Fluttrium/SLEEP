"use client";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-neutral-900 w-full py-8">
      <div className="container mx-auto flex flex-col items-center space-y-4">
        {/* Ссылки */}
        <div className="flex flex-col space-y-4 text-center">
          <Link href="/" className="text-lg font-medium hover:text-blue-500 transition">
            Home
          </Link>
          <Link href="/take-the-test" className="text-lg font-medium hover:text-blue-500 transition">
            Take the test
          </Link>
          <Link href="/doctors" className="text-lg font-medium hover:text-blue-500 transition">
            Врачи
          </Link>
        </div>

        {/* Email */}
        <div className="text-lg font-medium text-center">
          <Link href="mailto:michail_bv@list.ru" className="hover:text-blue-500 transition">
            michail_bv@list.ru
          </Link>
        </div>

        {/* Социальные сети */}
        <div className="flex space-x-6 pt-4">
          <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
            <FontAwesomeIcon icon={faFacebookF} className="text-2xl hover:text-blue-500 transition" />
          </Link>
          <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
            <FontAwesomeIcon icon={faTwitter} className="text-2xl hover:text-blue-500 transition" />
          </Link>
          <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} className="text-2xl hover:text-blue-500 transition" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
