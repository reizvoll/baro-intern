"use client";

import { KeyboardEvent, useState } from "react";

type TodoEditorProps = {
  title: string;
  onSubmit: (newTitle: string) => void;
  onCancel: () => void;
};

export default function TodoEditor({
  title,
  onSubmit,
  onCancel,
}: TodoEditorProps) {
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
      className="text-lg transition-colors truncate flex-1 min-w-0 p-1 border rounded"
    />
  );
}