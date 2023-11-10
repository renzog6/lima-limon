import Image from "next/image";
import Box from "@/components/ui/Box";
import Header from "@/components/ui/Header";

import logo from "@/images/logo.png";

export default async function Home() {
  return (
    <div className="w-full h-full overflow-hidden overflow-y-auto bg-neutral-900">
      <Header>
        <div className="flex items-center justify-center mb-2">
          <h1 className="text-3xl font-semibold text-amber-400">Lima Limon</h1>
        </div>
      </Header>
      <div className="px-6 mt-2 mb-7">
        <div className="flex flex-col items-center justify-center">
          <Box className="flex items-center justify-center">
            <Image
              className="relative dark:drop-shadow-[0_0_0.6rem_#ffffff70] "
              src={logo.src}
              alt="Logo Lima Limon"
              width={300}
              height={0}
              priority
            />
          </Box>
          <h1 className="text-2xl font-semibold text-white">
            Aromas y Fragancias
          </h1>
        </div>
      </div>
    </div>
  );
}
