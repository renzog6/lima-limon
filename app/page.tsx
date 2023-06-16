import Image from "next/image";
import logo from "@/images/logo.png";
import InputSelect from "@/components/InputSelect";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center j p-24">
      <div className="relative flex place-items-center ">
        <Image
          className="relative dark:drop-shadow-[0_0_0.6rem_#ffffff70] "
          src={logo.src}
          alt="Logo Lima Limon"
          width={300}
          height={0}
          priority
        />
      </div>
      <div className="">
        <label className="flex justify-center">
          <span className="text-gray-700 font-semibold text-2xl">
            Liman Limon
          </span>
        </label>
        <label className="flex justify-center text-lg">
          <span className="text-gray-700">Aromas y Fragancias</span>
        </label>
      </div>
    </main>
  );
}
