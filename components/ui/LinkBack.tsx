//@/components/ui/LinkBack.tsx
import Link from "next/link";
import { RiArrowGoBackLine } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

interface LinkBackProps {
  href: string;
  className?: string;
}

const LinkBack: React.FC<LinkBackProps> = ({ href, className }) => {
  return (
    <div className="flex items-center justify-center w-10 h-14">
      <Link
        href={href}
        className={twMerge(
          `flex items-center justify-center w-full`,
          className
        )}
      >
        <RiArrowGoBackLine size="20" />
      </Link>
    </div>
  );
};

export default LinkBack;
