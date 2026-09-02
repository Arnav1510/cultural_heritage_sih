export type HeritageCategory = 'ancestral' | 'modern';

export type HeritageTag =
  | 'Art'
  | 'Dance'
  | 'Architecture'
  | 'Food'
  | 'Festival'
  | 'Music'
  | 'Tradition'
  | 'Clothing'
  | 'Historical Site'
  | 'Craft'
  | 'Literature'
  | 'Technology';

export interface HeritageItem {
  id: string;
  title: string;
  description: string;
  background: string;
  facts: string[];
  tags: HeritageTag[];
  image: string;
}

export interface StateHeritage {
  state: string;
  capital: string;
  blurb: string;
  ancestral: HeritageItem[];
  modern: HeritageItem[];
  evolution: {
    theme: string;
    past: { title: string; description: string; image: string };
    present: { title: string; description: string; image: string };
  }[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface FilterOption {
  label: string;
  value: HeritageTag;
  icon: string;
}
