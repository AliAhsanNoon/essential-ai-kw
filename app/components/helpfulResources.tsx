"use client";
import React, { useState, useCallback } from "react";
import { FaArrowRight } from "react-icons/fa";
import CardForResource from "./cardForResource";
import {
  MdPersonAdd,
  MdSchool,
  MdComputer,
  MdAssignment,
  MdBusiness,
} from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { CgFileDocument } from "react-icons/cg";
import { FaGraduationCap } from "react-icons/fa";

interface QuestionItem {
  title: string;
  icon: React.ReactNode;
  items: string[];
}

const questions: QuestionItem[] = [
  {
    title: "New Agent Onboarding",
    icon: <MdPersonAdd size={24} />, // 👈 example icon
    items: [
      "What are my next steps?",
      "Who do I connect with for admin support?",
      "Who is on the ALC Hotline today?",
    ],
  },
  {
    title: "Finding Essential Documents",
    icon: <CgFileDocument size={24} />,
    items: [
      "Where can I find upcoming training sessions?",
      "How do I register for a workshop?",
      "Is there online material available for new agents?",
    ],
  },
  {
    title: "Connecting with the Right People",
    icon: <GrGroup size={24} />,
    items: [
      "Who handles our marketing materials?",
      "Where can I get help creating property flyers?",
      "How can I access social media templates?",
    ],
  },
  {
    title: "Setting Up Technology and Tools",
    icon: <MdComputer size={24} />,
    items: [
      "How do I log into the CRM system?",
      "Who can help me with tech setup?",
      "Where can I find tutorials for company software?",
    ],
  },
  {
    title: "Working with buyers and sellers",
    icon: <FaGraduationCap size={24} />,
    items: [
      "Where do I submit my completed contracts?",
      "Who reviews compliance for listings?",
      "How do I get help with transaction issues?",
    ],
  },
  {
    title: "Office Operations and Policies",
    icon: <MdBusiness size={24} />,
    items: [
      "What are the office hours?",
      "How do I reserve a conference room?",
      "Where can I find the company policies?",
    ],
  },
];

export default function HelpfulResources() {
  const [dialog, setDialog] = useState(true);

  const handleDialog = useCallback(() => {
    setDialog((prev) => !prev);
  }, []);
  return (
    <div className="w-full   flex items-center flex-col   bg-gray-50  border-1 border-gray-200 rounded-lg cursor-pointer ">
      <div
        className="gap-[20px] flex items-center w-full h-full hover:bg-gray-100 px-[20px] py-[10px]"
        onClick={handleDialog}
      >
        <FaArrowRight />
        <p className="text-[20px] font-bold flex items-center">
          Helpfull Resources
        </p>
      </div>
      {!dialog ? (
        <div className="w-full flex justify-center items-center flex-wrap gap-[20px] pb-[50px] mt-[20px]">
          {questions.map((data, index) => {
            return <CardForResource key={index} data={data} type="resource" />;
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
