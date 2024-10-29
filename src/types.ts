export interface LessonContent {
  type: "text" | "video" | "audio" | "podcast" | "youtube";  
  data: string;
}

export interface Lesson {
  title: string;
  description: string;
  topics: string[];
  content: LessonContent[];
}

export interface Module {
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  title: string;
  description: string;
  modules: Module[];
}
