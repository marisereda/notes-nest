export interface Note {
  id: string;
  name: string;
  category: Category['name'];
  created: number;
  content: string;
  archived: boolean;
}

export interface Category {
  icon: string;
  name: 'Idea' | 'Random Thought' | 'Task';
}

export interface CategoryStats extends Category {
  activeNumber: number;
  zipNumber: number;
}
