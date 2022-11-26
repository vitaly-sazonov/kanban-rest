import { Injectable } from '@angular/core';
import { KNOWN_ERRORS } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class ErrorDefinitionService {
  constructor() {}

  define = (status: number): string =>
    KNOWN_ERRORS.includes(status)
      ? `ERRORS.${status.toString()}`
      : 'ERRORS.unknown';
}
