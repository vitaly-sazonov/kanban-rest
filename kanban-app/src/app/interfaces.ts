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

export interface Board {
  id: number | string;
  title: string;
  columns?: Column[];
}

export interface Column {
  id: number | string;
  title: string;
  tasks?: Task[];
}

export interface Task{
  id: number|string;
  title: string;
}