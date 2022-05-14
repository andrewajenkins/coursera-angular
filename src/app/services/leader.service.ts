import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {
  [x: string]: any;

  constructor() { }

  getLeaders(): Observable<Leader[]> {
      return of(LEADERS).pipe(delay(2000));
  }

  getPromotion(id: string): Observable<Leader> {
      return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
  }
  getFeaturedLeader(): Observable<Leader> {
      return of(LEADERS[0]).pipe(delay(2000));
  }
}
