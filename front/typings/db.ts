export interface ITokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ModalList {
  title: string;
}

export interface IModal {
  modalList: ModalList | null;
  show: boolean;
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
  loadUserLoading: boolean;
  loadUserSuccess: boolean;
  loadUserError: boolean;
  signUpLoading: boolean;
  signUpSuccess: boolean;
  signUpError: boolean;
  passwordChangeLoading: boolean;
  passwordChangeSuccess: boolean;
  passwordChangeError: boolean;
}

export interface IStudy {
  data: null;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}
export interface IUserProfile {
  formData: FormData;
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
