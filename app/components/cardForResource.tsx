import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

interface QuestionItem {
  title: string;
  items: string[];
}

interface Builder {
  category: string;
  name: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  moreInfo: string;
}

interface CardPropsData {
    type: string;
    data: QuestionItem | Builder;
}

export default function CardForResource({type, data}: CardPropsData) {
  if (type === "resource" && 'title' in data) {
    return (
      <div className="max-w-[300px] hover:bg-gray-100 p-[20px] border-1 border-gray-400 rounded-lg">
        <div className="w-full h-full flex justify-center items-start flex-col gap-4">
          <p className="text-[24px] font-bold text-gray-600">
            {data.title}
          </p>
          <div>
            {data.items.map((item, index) => (
              <p key={index} className="gap-[2px] flex justify-start items-center text-gray-500 hover:text-gray-600">
                <IoIosArrowForward className="text-gray-600" />
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "service" && 'name' in data) {
    return (
      <div className="max-w-[400px] hover:bg-gray-100 p-[20px] border-1 border-gray-400 rounded-lg">
        <div className="w-full h-full flex justify-center items-start flex-col gap-4">
          <p className="text-[24px] font-bold text-gray-600">
            {data.name}
          </p>
          <p className="text-[16px] text-gray-500">
            {data.description}
          </p>
          <p className="text-[14px] text-gray-400">
            {data.phone}
          </p>
          <p className="text-[14px] text-gray-400">
            {data.email}
          </p>
        </div>
      </div>
    );
  }

  return null;
}
