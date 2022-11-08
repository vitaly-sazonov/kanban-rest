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
  id?: string;
  title?: string;
  description?: string;
  columns?: Column[];
}

export interface Column {
  id?: string;
  title: string;
  order?: number;
  tasks?: Task[];
}

export interface Task {
  id?: number | string;
  title: string;
  order?: number;
  userId?: string;
  description?: string;
  files?: File[];
}

export interface File {
  filename: string;
  fileSize: number;
}
