import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  @Input() userIsLogedIn: any;
  @Input() nickname: string = '';
  @Input() tokens: number = 0;
  @Input() userId: number = -1;
  @Output() headerLogOutEmite: any = new EventEmitter();
  @Input() haveBadge: boolean = false;

  constructor(private service: AppService) { }

  ngOnInit(): void {

  }

  logOut(){
    this.headerLogOutEmite.emit()
  }

}
