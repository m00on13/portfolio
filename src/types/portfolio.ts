import type { ElementType } from 'react';

export interface ProjectStory {
  id: string;
  tag: string;
  name: string;
  pitch: string;
  outcome?: string;
  stack: string[];
  github?: string;
  demo?: string;
  image: string;
}

export interface HighlightCategory {
  id: string;
  title: string;
  Icon: ElementType;
  coverImage?: string;
  bgColor: string;
  iconColor: string;
  stories: ProjectStory[];
}

export interface GridProject {
  id: string;
  name: string;
  Icon: ElementType;
  bgColor: string;
  stack: string[];
  status: string;
  github?: string;
}
