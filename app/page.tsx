import Image from "next/image";
import HelpfulResources from "./components/helpfulResources";
import ServiceDirectory from "./components/serviceDirectory";

export default function Home() {
  return (
    <div className="min-h-screen ">
      <div className="grid grid-cols-12">
        <div className="col-span-7 flex justify-center items-center  ml-[40px] pr-[20px] h-screen">
          <div className="flex flex-col items-center gap-4 overflow-y-auto h-full py-[100px] w-full px-2">
            <div className="w-[100px] h-[100px] rounded-full bg-amber-300 flex justify-center items-center">
              image
            </div>

            <p className="font-bold text-[40px] mt-[20px]">
              Hi! I'm Mia Mentor
            </p>
            <div className="bg-gray-300 h-[1px] w-full"></div>

            <p className="text-[16px] text-center text-gray-600">
              I'm your Real Estate AI Assistant, here to help you thrive with
              smart tools and expert guidance. Here are the kinds of questions I
              can answer!
            </p>

            <div className="w-full flex flex-col gap-[10px] mt-[20px]">
              <HelpfulResources />
              <ServiceDirectory />
            </div>

            <p className="text-[16px] text-gray-400 mt-[20px] cursor-pointer">
              Unsure what to ask? Use the guide →
            </p>

            <p className="text-[12px] text-gray-400 mt-[20px]">
              Mia provides information and guidance but does not offer specific
              legal, financial, or investment advice.
            </p>
          </div>
        </div>
        <div className="col-span-5 bg-gray-200 flex justify-center items-center">
              essential-ai-kw
        </div>
      </div>
    </div>
  );
}
