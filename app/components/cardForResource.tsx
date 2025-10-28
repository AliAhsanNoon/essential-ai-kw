import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { MdHome } from "react-icons/md";
import { useGlobalContext } from "@/lib/ContextProvider";

interface QuestionItem {
  title?: string;
  icon: React.ReactNode;
  items: string[];
}

interface Builder {
  icon: React.ReactNode;
  category: string;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  website: string;
  moreInfo: string;
  title?: string;
}

interface CardPropsData {
  type: string;
  data: QuestionItem | Builder;
  onQuestionClick?: (question: string) => void;
}

export default function CardForResource({ type, data, onQuestionClick }: CardPropsData) {

  const { globalString, setGlobalString } = useGlobalContext();

  function handleClick() {
    setGlobalString(data?.title as string);
  }

  if (type === "resource" && "title" in data && "items" in data) {
    const resourceData = data as QuestionItem;
    return (
      <div className="h-[230px] max-w-[350px] bg-[#f8f8f8] p-[20px] border-1 border-gray-400 rounded-lg">
        <div className="w-full h-full flex justify-start items-center flex-col gap-4">
          <p className="text-[20px] w-full font-bold text-[#777777] hover:underline flex justify-start items-center gap-[10px]" onClick={handleClick}>{resourceData.icon}{resourceData.title}</p>
          <div>
            {resourceData.items.map((item: string, index: number) => (
              <p
                key={index}
                onClick={() => onQuestionClick && onQuestionClick(item)}
                className="gap-[2px] flex justify-start items-center hover:underline text-[#999999] hover:text-gray-600 cursor-pointer"
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
    const serviceData = data as Builder;
    return (
      <div className="h-[400px] w-[350px] bg-[#f8f8f8] p-[20px] border-1 border-gray-400 rounded-lg">
        <div className="w-full h-full flex justify-start items-start flex-col gap-4">
          <div className="w-full flex gap-4 flex-col">
            <div className="w-[40px] h-[40px] bg-gray-200 rounded-full flex justify-center items-center">
              {serviceData.icon}
            </div>
            <span className="font-semibold">{serviceData.category}</span>
          </div>
          <div className="w-full h-[1px] bg-gray-200"></div>
          <div className="gap-[10px] flex flex-col">
            <p className="font-semibold">{serviceData.name}</p>
            <p className="text-gray-500 text-[14px]">{serviceData.description}</p>
            <p className="text-gray-400">{serviceData.phone}</p>
            <p>{serviceData.email}</p>
          </div>
          <div className="flex flex-col  items-start gap-[30px]">
            <Link href={serviceData.website} className="hover:underline">website</Link>
            <button 
              onClick={() => onQuestionClick && onQuestionClick(`Please tell me more about ${serviceData.name} from the Mia Mentor Service Provider Directory`)}
              className="bg-[#888888] hover:bg-[#666666] text-white px-[20px] py-[10px] text-[12px] rounded-3xl cursor-pointer"
            >
              More info
            </button>

          </div>
        </div>
      </div>
    );
  }

  return null;
}
