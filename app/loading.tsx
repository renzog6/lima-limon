import Image from "next/image";
import loading from "@/images/loading.gif";

export default function Loading() {
  return (
    <div className="flex justify-center place-items-center w-full">
      <Image
        className="relative dark:drop-shadow-[0_0_0.6rem_#ffffff70] "
        src={loading.src}
        alt="loading"
        width={200}
        height={0}
        priority
      />
    </div>
  );
}
