//@/components/ui/NotFound.tsx
import { twMerge } from "tailwind-merge";

interface NotFoundProps {
  item?: string;
  className?: string;
}

const NotFound: React.FC<NotFoundProps> = ({ item, className }) => {
  return (
    <>
      <div
        className={twMerge(
          `bg-neutral-800 h-24 w-48 flex items-center`,
          className
        )}
      >
        <h3 className="flex justify-center w-full text-white">
          not found {item}
        </h3>
      </div>
    </>
  );
};

export default NotFound;
