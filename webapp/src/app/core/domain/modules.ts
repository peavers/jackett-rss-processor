export interface Feed {
  id?: string;
  displayName?: string;
  url?: string;
  patterns?: Pattern[];
}

export interface Pattern {
  id?: string;
  enabled?: boolean;
  displayName?: string;
  regex?: string;
}

export interface Item {
  title?: string;
  size?: number;
  pubDate?: string;
  guid?: string;
  match?: boolean;
}

export interface Option {
  backgroundColor: string;
  buttonColor: string;
  headingColor: string;
  label: string;
  value: string;
}
