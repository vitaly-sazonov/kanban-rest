export enum QUERY_PARAMS_FIRST {
  signin = '/signin',
  users = '/users',
  signup = '/signup',
  boards = '/boards',
  file = '/file',
  logs = '/logs',
}

export enum QUERY_PARAMS_SECOND {
  columns = '/columns',
  error = '/error',
  info = '/info',
}

export enum RouterStateValue {
  main = 'main',
  registration = 'registration',
  login = 'login',
}

export enum PasswordValidatorSymbols {
  upperCase = 'uppercase',
  lowerCase = 'lowercase',
  numbers = 'numbers',
  special = 'special',
  minLength = 'minlength',
  symbol = '*@!#%&()^~{}',
}
