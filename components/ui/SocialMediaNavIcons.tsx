import { Link } from "lucide-react";
import React from "react";
import { FaLinkedinIn, FaFacebook, FaInstagram } from "react-icons/fa6";

type Props = {};

const SocialMediaNavIcons = (props: Props) => {
  return (
    <div className="hidden items-center gap-x-4 md:flex">
      <Link href="/">
        <FaLinkedinIn className="text-2xl" />
      </Link>
      <Link href="/">
        <FaFacebook className="text-2xl" />
      </Link>
      <Link href="/">
        <FaInstagram className="text-2xl" />
      </Link>
    </div>
  );
};

export default SocialMediaNavIcons;
