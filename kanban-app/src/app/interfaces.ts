export interface UserLogin {
  login: string;
  password: string;
}

export interface UserRegistration {
  name: string;
  login: string;
  password: string;
}

export interface GetUserByIdResponse {
  id: string;
  name: string;
  login: string;
}

export interface ErrorResponse {
  statusCode: number;
  message: string;
}

export interface LoginResponse {
  token: string;
}
