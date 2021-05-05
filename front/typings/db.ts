export interface IUser {
  userLoading: boolean;
  userData?: any;
  error?: any;
  accessToken?: string;
}

export interface LoginRequestPayload {
  email: string;
  password: string;
}

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}
