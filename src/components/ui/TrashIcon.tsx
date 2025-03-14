export default function TrashIcon() {
  return (
    <button className="p-2 transition">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        className="w-6 h-6 text-gray-500 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="216" y1="56" x2="40" y2="56" />
        <line x1="104" y1="104" x2="104" y2="168" />
        <line x1="152" y1="104" x2="152" y2="168" />
        <path d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" />
        <path d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56" />
      </svg>
    </button>
  );
}
