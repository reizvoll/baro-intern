import { KeyboardEvent, useState } from "react";

type TodoEditorProps = {
  title: string;
  onSubmit: (newTitle: string) => void;
  onCancel: () => void;
};

export default function TodoEditor({ title, onSubmit, onCancel }: TodoEditorProps) {
  const [newTitle, setNewTitle] = useState(title);

  const handleEditSubmit = () => {
    const trimmedTitle = newTitle.trim();
    if (trimmedTitle && trimmedTitle !== title) {
      onSubmit(trimmedTitle);
    } else {
      onCancel();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleEditSubmit();
    } else if (e.key === "Escape") {
      onCancel();
      setNewTitle(title);
    }
  };

  return (
    <input
      type="text"
      value={newTitle}
      onChange={(e) => setNewTitle(e.target.value)}
      onBlur={handleEditSubmit}
      onKeyDown={handleKeyDown}
      autoFocus
      className="text-body1 tb:text-body2 mb:text-body3 min-w-0 flex-1 rounded border px-2 py-1 outline-none transition-colors dark:border-gray-600 dark:bg-gray-800 dark:text-white"
    />
  );
}