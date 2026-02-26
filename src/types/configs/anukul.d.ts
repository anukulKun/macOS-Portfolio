export interface AnukulMdData {
  id: string;
  title: string;
  file: string;
  icon: string;
  excerpt: string;
  link?: string;
}

export interface AnukulData {
  id: string;
  title: string;
  icon: string;
  md: AnukulMdData[];
}
