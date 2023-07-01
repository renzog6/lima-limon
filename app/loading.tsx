import Image from "next/image";
import loading from "@/images/loading.gif";

export default function Loading() {
  return (
    <div className="flex justify-center place-items-center w-full py-2">
      <Image
        className="relative py-2 dark:drop-shadow-[0_0_0.6rem_#ffffff70] "
        src={loading.src}
        alt="loading"
        width={100}
        height={0}
        priority
      />
    </div>
  );
}
