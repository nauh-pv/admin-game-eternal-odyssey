export interface Procedure {
  key: string;
  procedureName: string;
  procedure: string;
}

export interface Identity {
  key: string;
  name: string;
  info: string;
  story: string;
  styleConversation: string;
  exampleConversation: string;
}

export interface Config {
  key: string;
  name: string;
  procedureID: string;
  identityID: string;
  role: string;
  target: string;
  mission: string;
  note: string;
}

export interface PageManager {
  facebook: string;
  page: string;
  facebookID: string;
  pageID: string;
  file: File[];
  config: string;
  actionType: string;
  key: string;
  subscribed?: Subscribed;
}

export interface PostScheduleData {
  key: string;
  idea: string;
  pageID: string;
  time: any;
  typeImage: string;
  listImage?: string[];
  repeat?: string;
  numberIterations?: number;
}

export interface PostScheduleItem {
  key: string;
  imagesList: string[];
  content: string;
  linkPost: string;
  pageID: string;
  postDate: string;
  status: number;
  pageName: string;
}

interface Subscribed {
  comments: number;
  messages: number;
}

interface File {
  collectionName: string;
  fileName: string;
}
