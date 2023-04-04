export type NumberString = number | string;
export type BooleanString = boolean | string;
export type TypeOrArrayOf<T> = T | T[];
export type PromiseOrType<T> = T | Promise<T>;

export interface ExternalUrls {
  spotify: string;
}

export interface Copyright {
  text: string;
  type: string;
}

export interface ExternalIds {
  upc: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}
