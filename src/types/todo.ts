export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface IconButtonProps {
  onClick: () => void;
  title?: string;
}
