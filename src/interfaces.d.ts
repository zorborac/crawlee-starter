export interface ScrapeModel {
  [field: string]: {
    selector: string;
    default: string | number | boolean; // maybe gasp any PRE DEFINED type
  };
}

export interface Post {
  username: string;
  createdAt: string;
  body: string;
  iterations: number;
}

export interface TargetData {
  friendlyName: string;
  path: string;
  baseModel?: Record<string, unknown>;
  rootSelector: string | null;
}
