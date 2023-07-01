//@/app/error.tsx
"use client"; // Error components must be Client Components

import { useEffect } from "react";
import Image from "next/image";
import errorImg from "@/images/error.gif";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center place-items-center py-3">
      <Image
        className="relative dark:drop-shadow-[0_0_0.6rem_#ffffff70] py-2"
        src={errorImg.src}
        alt="Error"
        width={100}
        height={0}
        priority
      />
      <button
        className="bordered py-2 border-amber-300"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
