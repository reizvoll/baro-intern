import { useState } from "react";

type DotProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function Dot({ onEdit, onDelete }: DotProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div className="relative inline-block">
      <button onClick={toggleMenu} className="p-2 text-gray-500 dark:text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6">
          <rect width="256" height="256" fill="none" />
          <circle cx="128" cy="128" r="12" fill="currentColor" />
          <circle cx="196" cy="128" r="12" fill="currentColor" />
          <circle cx="60" cy="128" r="12" fill="currentColor" />
        </svg>
      </button>

      {menuOpen && (
        <div
          className="
            absolute top-full right-0 rounded
            inline-flex items-center gap-4
            whitespace-nowrap
            bg-white p-2 shadow-lg
            dark:bg-gray-800
            z-50
          "
        >
          <button
            onClick={() => {
              setMenuOpen(false);
              onEdit();
            }}
            className="text-body3 text-gray-500 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-500"
          >
            수정
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              onDelete();
            }}
            className="text-body3 text-gray-500 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}