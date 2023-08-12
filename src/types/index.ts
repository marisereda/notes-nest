export interface Category {
  icon: string;
  name: 'Idea' | 'Random Thought' | 'Task';
}

export interface CategoryStats extends Category {
  activeNumber: number;
  zipNumber: number;
}
