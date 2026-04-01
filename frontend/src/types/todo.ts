// types/todo.ts
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type Status = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export interface Todo {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
}

export interface FilterState {
  priority: Priority | null;
  status: Status | null;
}

export interface TodoFormData {
  title: string;
  description: string;
  priority: Priority;
  dueDate?: string;
}