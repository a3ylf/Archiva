export interface Document {
  id: number;
  status: string;
  author: string;
  category: string;
  date: string;
  size: string;
  transferUUID?: string;
}

export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}

