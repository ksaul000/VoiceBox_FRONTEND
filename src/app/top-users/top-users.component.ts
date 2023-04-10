import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-users',
  templateUrl: './top-users.component.html',
  styleUrls: ['./top-users.component.css']
})
export class TopUsersComponent implements OnInit {
  isTopUsersVisible = false;
  @Input() topUsers: any = [{}, {}, {}];

  constructor() { }

  ngOnInit(): void {
  }

  toggleTopUsers() {
    this.isTopUsersVisible = !this.isTopUsersVisible;
  }

  deleteQuest(){
    this.isTopUsersVisible = !this.isTopUsersVisible;
  }
  

}
