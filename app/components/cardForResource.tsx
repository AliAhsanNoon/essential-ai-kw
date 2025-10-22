import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { MdHome } from "react-icons/md";

interface QuestionItem {
  title: string;
  icon:React.ReactNode;
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

export default function CardForResource({ type, data }: CardPropsData) {
  if (type === "resource" && "title" in data) {
    return (
      <div className="max-w-[350px] h-[] bg-gray-100 p-[20px] border-1 border-gray-400 rounded-lg">
        <div className="w-full h-full flex justify-start items-center flex-col gap-4">
          <p className="text-[20px] w-full font-bold text-gray-600 hover:underline flex justify-start items-center gap-[10px]">{data.icon}{data.title}</p>
          <div>
            {data.items.map((item, index) => (
              <p
                key={index}
                className="gap-[2px] flex justify-start items-center hover:underline text-gray-500 hover:text-gray-600"
              >
                <IoIosArrowForward className="text-gray-600" />
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "service" && "name" in data) {
    return (
      <div className="w-[350px] bg-gray-100 p-[20px] border-1 border-gray-400 rounded-lg">
        <div className="w-full h-full flex justify-center items-start flex-col gap-4">
          <div className="w-full flex gap-4 flex-col">
            <div className="w-[40px] h-[40px] bg-gray-200 rounded-full flex justify-center items-center">
              <MdHome className="text-2xl" />
            </div>
            <span className="font-semibold">{data.category}</span>
          </div>
          <div className="w-full h-[1] bg-gray-200"></div>
          <div className="gap-[10px] flex flex-col">
            <p className="font-semibold">{data.name}</p>
            <p className="text-gray-500 text-[14px]">{data.description}</p>
            <p className="text-gray-400">{data.phone}</p>
            <p>{data.email}</p>
          </div>
          <div className="flex flex-col  items-start gap-[30px]">
            <Link href={data.website} className="hover:underline">website</Link>
            <button className="bg-gray-500 hover:bg-gray-600 text-white px-[20px] py-[10px] text-[12px] rounded-3xl cursor-pointer">More info</button>

          </div>
        </div>
      </div>
    );
  }

  return null;
}
