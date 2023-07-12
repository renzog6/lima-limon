import Image from "next/image";
import Box from "@/components/ui/Box";
import Header from "@/components/ui/Header";

import logo from "@/images/logo.png";

//export const revalidate = 60;

export default async function Home() {
  return (
    <div className="bg-neutral-900 h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2 flex justify-center items-center">
          <h1 className="text-amber-400 text-3xl font-semibold">Lima Limon</h1>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex flex-col justify-center items-center">
          <Box className="flex justify-center items-center">
            <Image
              className="relative dark:drop-shadow-[0_0_0.6rem_#ffffff70] "
              src={logo.src}
              alt="Logo Lima Limon"
              width={300}
              height={0}
              priority
            />
          </Box>
          <h1 className="text-white text-2xl font-semibold">
            Aromas y Fragancias
          </h1>
        </div>
      </div>
    </div>
  );
}
