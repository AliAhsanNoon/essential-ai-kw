"use client";
import React, { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import CardForResource from "./CardForResource";
import { FaWarehouse } from "react-icons/fa";
import { FaWater } from "react-icons/fa";
import { FaTree } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa6";
import { FaCamera } from "react-icons/fa6";
import { MdHome } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

interface Builder {
  icon: React.ReactNode;
  category: string;
  name: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
  website: string;
  moreInfo: string;
  title?: string;
}

const builders: Builder[] = [
  {
    icon: <MdHome className="text-2xl" />,
    category: "Home Builder",
    name: "Douglas Hill Companies, LLC",
    description: "New Construction, Home Builder",
    phone: "(603) 234-7729",
    email: "hillbuild@msn.com",
    website: "https://www.doughlashillcompanies.com",
    moreInfo:
      "Specializing in high-quality custom home construction and renovations.",
  },
  {
    icon: <FaWarehouse className="text-2xl" />,
    category: "HGarage Door Solutions",
    name: "Garage Door Installation & Repair",
    description: "Custom Homes, Remodeling",
    phone: "(603) 628-3667",
    address: "444 E Industrial Park Dr Unit 3, Manchester, NH 03109",
    website: "https://www.evergreenhomes.com",
    moreInfo:
      "Building energy-efficient and eco-friendly homes with modern design.",
  },
  {
    icon: <FaWater className="text-2xl" />,
    category: "Water Solutions",
    name: "Contoocook Well",
    description: "Water Well Services",
    phone: "(603) 428-6060",
    address: "524 Weare Rd, Henniker, NH 03242",
    website: "https://www.summitconstructionco.com",
    moreInfo:
      "Providing complete design-build solutions for high-end properties.",
  },
  {
    icon: <FaTree className="text-2xl" />,
    category: "Landscaping",
    name: "Busy Bee Landscaping",
    description: "Comprehensive Landscaping Solutions",
    phone: "(603) 669-6945",
    email: "busybeenh@gmail.com",
    website: "https://www.mapleridgebuilders.com",
    moreInfo: "Experts in home additions, kitchen remodeling, and full builds.",
  },
  {
    icon: <FaBuilding className="text-2xl" />,
    category: "Home Builder",
    name: "Denali Building and Development",
    description: "Luxury Custom Homes",
    address: "Bedford, NH 03110",
    website: "https://www.blueskydevelopers.com",
    moreInfo:
      "From concept to completion — modern spaces built with precision.",
  },
  {
    icon: <FaBuilding className="text-2xl" />,
    category: "Home Gutters",
    name: "The Brothers That Just Do Gutters",
    phone: "(866) 550-3569",
    website: "https://www.oakleafconstruction.com",
    moreInfo: "Building durable, beautiful homes that stand the test of time.",
  },
  {
    icon: <FaCamera className="text-2xl" />,
    category: "Real Estate Photography",
    name: "S&B Connections",
    description: "Green Homes, Smart Designs",
    phone: "(603) 867-2455",
    website: "https://www.cedarstonehomes.com",
    moreInfo: "Focused on sustainable construction and modern architecture.",
  },
];

interface ServiceDirectoryProps {
  onQuestionClick?: (question: string) => void;
}

export default function ServiceDirectory({ onQuestionClick }: ServiceDirectoryProps) {
  const [dialog, setDialog] = useState(true);

  function handleDialog() {
    setDialog((prev) => !prev);
  }
  return (
    <div className="w-full   flex items-center flex-col   bg-gray-50  border-1 border-gray-200 rounded-lg cursor-pointer ">
      <div
        className="gap-[20px] flex items-center w-full h-full hover:bg-[#e5e5e5] px-[20px] py-[10px]"
        onClick={handleDialog}
      >
        {dialog ? (
          <MdKeyboardArrowRight className="text-[30px]" />
        ) : (
          <MdKeyboardArrowDown className="text-[30px]" />
        )}
        <p className="text-[20px] font-bold flex items-center">
          Service Directory
        </p>
      </div>
      <AnimatePresence>
        {!dialog && (
          <motion.div
            key="resources"
            className="w-full flex justify-center items-center flex-wrap gap-[20px] pb-[50px] mt-[20px]"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            {builders.map((data, index) => (
              <CardForResource key={index} data={data} type="service" onQuestionClick={onQuestionClick} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
