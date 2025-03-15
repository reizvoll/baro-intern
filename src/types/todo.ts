export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
}

export interface IconButtonProps {
  onClick: () => void;
  title?: string;
}
