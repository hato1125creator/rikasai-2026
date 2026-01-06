export type FloorType = '1F' | '2F' | '3F';
export type ClassroomType = 'class' | 'club' | 'food' | 'stage' | 'other';

export interface Classroom {
  id: string;
  name: string;
  floor: FloorType;
  type: ClassroomType;
  x: number;
  y: number;
  width: number;
  height: number;
  organizer: string;
  description: string;
  time?: string;
  image?: string;
}

export interface Floor {
  floor: FloorType;
  title: string;
  description: string;
  classrooms: Classroom[];
}
