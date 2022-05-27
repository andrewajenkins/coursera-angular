import { Component, Inject, OnInit } from '@angular/core';
import { expand, flyInOut } from '../animations/app.animation';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders!: Leader[];
  leadersErrMess!: string;
  
  constructor(private leaderService: LeaderService,
    @Inject('BaseURL') public baseURL: any) { }

  ngOnInit(): void {
    this.leaderService.getLeaders().subscribe(
      leader => this.leaders = leader,
      leadersErrMess => this.leadersErrMess = <any>leadersErrMess
    );
  }

}
