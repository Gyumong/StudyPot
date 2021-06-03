export interface ITokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IToken {
  expiredAt: number;
  iat: number;
  userId: number;
  userName: string;
}

export interface IUser {
  user: any;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  isLoggedIn: boolean;
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
