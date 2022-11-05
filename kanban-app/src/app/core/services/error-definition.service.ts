import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorDefinitionService {
  constructor() {}

  define=(status: number): string => `ERRORS.${status.toString()}`
    
  }

