import { IconButtonProps } from "@/types/todo";

export default function EditButton({ onClick }: IconButtonProps) {
  return (
    <button onClick={onClick} className={`p-2 transition tb:p-1`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        className="h-6 w-6 text-gray-500 hover:text-blue-500 tb:h-5 tb:w-5 mb:h-4 mb:w-4 dark:text-gray-300 dark:hover:text-blue-400"
      >
        <rect width="256" height="256" fill="none" />
        <path
          d="M96,216H48a8,8,0,0,1-8-8V163.31a8,8,0,0,1,2.34-5.65L165.66,34.34a8,8,0,0,1,11.31,0L221.66,79a8,8,0,0,1,0,11.31Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        />
        <line
          x1="216"
          y1="216"
          x2="96"
          y2="216"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        />
        <line
          x1="136"
          y1="64"
          x2="192"
          y2="120"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        />
      </svg>
    </button>
  );
}
