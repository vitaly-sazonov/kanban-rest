import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HashService {
  getHash(data?: string) {
    let hash = 0;
    if (data?.length === 0) return hash;
    [...data!].forEach(i => {
      let ch = i.charCodeAt(0);
      hash = (hash << 5) - hash + ch;
      hash = hash & hash;
    });
    return hash;
  }
}
