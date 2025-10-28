"use client";
import React, { useState, useCallback } from "react";
import CardForResource from "./CardForResource";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

import {
  MdPersonAdd,
  MdComputer,
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
    icon: <MdPersonAdd size={24} />, 
    items: [
      "What are my next steps?",
      "Where's the KW office calendar?",
      "How do I set up my Command marketing profile?",
    ],
  },
  {
    title: "Finding Essential Documents",
    icon: <CgFileDocument size={24} />,
    items: [
      "Where can I find buyer and seller contracts?",
      "What forms are needed for offers and disclosures?",
      "How do I access closing documents?",
    ],
  },
  {
    title: "Connecting with the Right People",
    icon: <GrGroup size={24} />,
    items: [
      "Who can mentor me in the office?",
      "Who do I connect with for admin support?",
      "Who is on the ALC Hotline today?",
    ],
  },
  {
    title: "Setting Up Technology and Tools",
    icon: <MdComputer size={24} />,
    items: [
      "How do I set up my accounts?",
      "How do I setup my KW command website?",
      "What tools should I use for marketing?",
    ],
  },
  {
    title: "Getting the Education You Need",
    icon: <FaGraduationCap size={24} />,
    items: [
      "What events and classes are upcoming?",
      "How do I get information on continuing education?",
      "How do I handle my first transaction?",
    ],
  },
  {
    title: "Working with buyers and sellers",
    icon: <MdBusiness size={24} />,
    items: [
      "Understanding buyers and sellers goals and timelines?",
      "What should I do meeting buyers and sellers for the first time?",
      "Tips on pricing stategies?",
    ],
  },
];

interface HelpfulResourcesProps {
  onQuestionClick?: (question: string) => void;
}

export default function HelpfulResources({ onQuestionClick }: HelpfulResourcesProps) {
  const [dialog, setDialog] = useState(true);

  const handleDialog = useCallback(() => {
    setDialog((prev) => !prev);
  }, []);
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
          Helpfull Resources
        </p>
      </div>
      <AnimatePresence>
        {!dialog && (
          <motion.div
            className="w-full flex justify-center items-center flex-wrap gap-[20px] pb-[50px] mt-[20px]"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            {questions.map((data, index) => {
              return (
                <CardForResource key={index} data={data} type="resource" onQuestionClick={onQuestionClick} />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
