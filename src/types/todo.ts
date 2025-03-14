export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface IconButtonProps {
  onClick: () => void;
  className: string;
  title: string;
}
