import { KeyboardEvent, useEffect, useRef, useState } from "react";

type TodoEditorProps = {
  title: string;
  onSubmit: (newTitle: string) => void;
  onCancel: () => void;
  finishEditingTrigger?: boolean;
};

export default function TodoEditor({ title, onSubmit, onCancel, finishEditingTrigger = false }: TodoEditorProps) {
  const [newTitle, setNewTitle] = useState(title);
  const handleEditSubmitRef = useRef<() => void>(() => {});

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

  useEffect(() => {
    if (finishEditingTrigger) {
      handleEditSubmitRef.current();
    }
  }, [finishEditingTrigger]);

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
