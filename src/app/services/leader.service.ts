import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {
  [x: string]: any;

  constructor() { }

  getLeaders() {
    return LEADERS;
  }

  getPromotion(id: string): Leader {
    return LEADERS.filter((leader) => (leader.id === id))[0];
  }

  getFeaturedLeader() {
    return LEADERS[0];
  }
}
