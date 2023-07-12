"use client";

import { BounceLoader } from "react-spinners";

import Box from "@/components/ui/Box";

const Loading = () => {
  return (
    <Box className="flex justify-center h-full py-10">
      <BounceLoader color="#22c55e" size={100} />
    </Box>
  );
};

export default Loading;
