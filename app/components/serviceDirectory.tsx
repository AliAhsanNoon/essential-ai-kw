
"use client";
import React, {useState} from "react";
import { FaArrowRight } from "react-icons/fa";
import CardForResource from "./cardForResource";

interface Builder {
  category: string;
  name: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  moreInfo: string;
}

const builders: Builder[] = [
  {
    category: "Home Builder",
    name: "Douglas Hill Companies, LLC",
    description: "New Construction, Home Builder",
    phone: "(603) 234-7729",
    email: "hillbuild@msn.com",
    website: "https://www.doughlashillcompanies.com",
    moreInfo: "Specializing in high-quality custom home construction and renovations."
  },
  {
    category: "Home Builder",
    name: "Evergreen Homes Inc.",
    description: "Custom Homes, Remodeling",
    phone: "(502) 784-1123",
    email: "contact@evergreenhomes.com",
    website: "https://www.evergreenhomes.com",
    moreInfo: "Building energy-efficient and eco-friendly homes with modern design."
  },
  {
    category: "Home Builder",
    name: "Summit Construction Co.",
    description: "Luxury Homes, Design-Build",
    phone: "(207) 335-9988",
    email: "info@summitconstructionco.com",
    website: "https://www.summitconstructionco.com",
    moreInfo: "Providing complete design-build solutions for high-end properties."
  },
  {
    category: "Home Builder",
    name: "Maple Ridge Builders",
    description: "Residential Construction, Additions",
    phone: "(919) 455-7621",
    email: "hello@mapleridgebuilders.com",
    website: "https://www.mapleridgebuilders.com",
    moreInfo: "Experts in home additions, kitchen remodeling, and full builds."
  },
  {
    category: "Home Builder",
    name: "BlueSky Developers",
    description: "Custom Homes, Commercial Projects",
    phone: "(813) 904-5532",
    email: "support@blueskydevelopers.com",
    website: "https://www.blueskydevelopers.com",
    moreInfo: "From concept to completion — modern spaces built with precision."
  },
  {
    category: "Home Builder",
    name: "OakLeaf Construction",
    description: "New Construction, Renovation",
    phone: "(317) 268-0472",
    email: "info@oakleafconstruction.com",
    website: "https://www.oakleafconstruction.com",
    moreInfo: "Building durable, beautiful homes that stand the test of time."
  },
  {
    category: "Home Builder",
    name: "CedarStone Homes",
    description: "Green Homes, Smart Designs",
    phone: "(406) 712-8094",
    email: "contact@cedarstonehomes.com",
    website: "https://www.cedarstonehomes.com",
    moreInfo: "Focused on sustainable construction and modern architecture."
  }
];


export default function ServiceDirectory() {

const [dialog, setDialog] = useState(true);

  function handleDialog()
  {
    setDialog((prev)=>(!prev))
  }
  return (
    <div className="w-full   flex items-center flex-col   bg-gray-50  border-1 border-gray-200 rounded-lg cursor-pointer ">
          <div className="gap-[20px] flex items-center w-full h-full hover:bg-gray-100 px-[20px] py-[10px]" onClick={handleDialog}>
            <FaArrowRight />
            <p className="text-[20px] font-bold flex items-center">
              Service Directory
            </p>
          </div>
          {!dialog ? (
            <div className="w-full flex justify-center items-center flex-wrap gap-[20px] pb-[50px] mt-[20px]">
              {builders.map((data, index) => {
                return <CardForResource key={index} data={data} type="service"/>;
              })}
            </div>
          ) : (
            ""
          )}
        </div>
  );
}
