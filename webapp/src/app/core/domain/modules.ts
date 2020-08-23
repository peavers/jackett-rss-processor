export interface Feed {
  id?: string;
  displayName?: string;
  url?: string;
  createdDate?: number;
  patterns?: Pattern[];
  cachedItems?: Item[];
}

export interface Pattern {
  id?: string;
  isEnabled?: boolean;
  displayName?: string;
  regex?: string;
  testEndpoint?: string;
}

export interface Item {
  title?: string;
  size?: number;
  pubDate?: string;
  guid?: string;
  match?: boolean;
}

export interface Channel {
  link?: string;
  description?: string;
  language?: string;
  title?: string;
  category?: string;
  image?: Image;
}

export interface Image {
  link?: string;
  description?: string;
  title?: string;
  url?: string;
}

export interface Option {
  backgroundColor: string;
  buttonColor: string;
  headingColor: string;
  label: string;
  value: string;
}
