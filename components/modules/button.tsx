import { concat } from "@/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={concat(
        className,
        "bg-[#272a2d] m-2 px-4 py-2",
        "border border-1 border-[#35393d] rounded-md "
      )}
      {...props}
    >
      {children}
    </button>
  );
}
