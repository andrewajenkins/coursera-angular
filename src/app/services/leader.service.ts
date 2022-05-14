import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {
  [x: string]: any;

  constructor() { }

  getLeaders(): Promise<Leader[]> {
    return new Promise(resolve=> {
        setTimeout(() => resolve(LEADERS), 2000);
      });
    }

  getPromotion(id: string): Promise<Leader> {
    return new Promise(resolve=> {
      setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]), 2000);
    });
  }
  getFeaturedLeader(): Promise<Leader> {
    return new Promise(resolve=> {
      setTimeout(() => resolve(LEADERS[0]), 2000);
    });
  }
}
