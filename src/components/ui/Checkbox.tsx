export default function Checkbox({ checked, onToggle }: { checked: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors tb:h-5 tb:w-5 mb:h-4 mb:w-4 ${
        checked ? "border-green-400 text-green-400" : "border-gray-300 text-gray-300"
      }`}
    >
      {checked && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fill="currentColor" className="h-6 w-6">
          <path
            fillRule="evenodd"
            d="M9.707 13.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l6-6a1 1 0 0 0-1.414-1.414l-5.293 5.293-2.293-2.293z"
          />
        </svg>
      )}
    </button>
  );
}
