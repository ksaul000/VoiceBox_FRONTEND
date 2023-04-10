import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from '../app.service';
import { Console } from 'console';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  @Input() userId = -1;
  nickname: string = '';
  tokens: number = 0;
  hotTakes: any = [];
  quests: any = [];
  @Output() logOutEmiter: any = new EventEmitter();
  haveBadge: boolean = false;
  top3: any = [{nickname: "user", num_completed_quests: 0}, {nickname: "user", num_completed_quests: 0}, {nickname: "user", num_completed_quests: 0}];

  constructor(private service: AppService) { }

  ngOnInit(): void {
    this.getTop3();
    this.getUserForHeader();
    this.loadPosts();
    this.loadQuests();
    this.getBadge();
  }

  refreshQuests(){
    this.loadQuests();
  }

  getUserForHeader(){
    this.service.getUserById(this.userId).subscribe(
      (response:any) => {
          this.nickname = response.entry[0].resource.Nickname;
          this.tokens = response.entry[0].resource.Tokens;

    },
    (error) => {
      const errorMesages = error.error.errorMesages.join("\n");
      alert(errorMesages);
    }
    );
  }

  loadPosts(){
    this.service.getHotTake().subscribe(
      (response:any) => {
          this.hotTakes = response.entry;
    },
    (error) => {
      const errorMesages = error.error.errorMesages.join("\n");
      alert(errorMesages);
    }
    );
  }

  logOut(){
    this.userId = -1;
    this.logOutEmiter.emit();

  }

  addHotTakeCache(newHotTake: any){
    this.hotTakes.unshift(newHotTake);
  }

  addQuestCache(newQuest: any){

    this.quests.entry.unshift(newQuest);
  }

  removeHotTake(hotTakeId: number){

    this.hotTakes=this.removeHotTakeById(this.hotTakes, hotTakeId);
  }

  removeQuest(questId: number){
    this.quests.entry=this.removeQuestById(this.quests, questId);
  }

  removeHotTakeById(list: any[], idToRemove: number): any[] {
    return list.filter((item) => item.resource.Id !== idToRemove);
  }

  removeQuestById(list: any, idToRemove: number): any[] {

    return list.entry.filter((item: any) => item.resource.Id !== idToRemove);
  }

  loadQuests(){
    this.service.getQuests().subscribe(
      (response:any) => {
        
        this.quests = response;
    },
    (error) => {
      const errorMesages = error.error.errorMesages.join("\n");
      alert(errorMesages);
    }
    );
  }

  pay30Tokens(){
    this.tokens=this.tokens-30;
  }

  checkIfIfCompleted(userId: number, topic: string){
    const body = {UserId: userId, Topic: topic}
    this.service.checkCompletedQuest(body).subscribe(
      (response:any) => {

      },
      (error) => {
        
      }
    );
    return true;
  }

  addTokens(){
    this.tokens = this.tokens + 10;
  }
  
  getBadge(){
    this.service.getBadge(this.userId).subscribe(
      (response:any) => {
        this.haveBadge=response.badge;
      },
      (error) => {
        this.haveBadge=false;
      } 
    );
    this.haveBadge = false
  }

  getTop3(){
    this.service.getTop3().subscribe(
      (response:any) => {
        this.top3 = response.recordset;
        console.log(this.top3)
      },
      (error) => {
        
      } 
    );
  }

  refreshPosts(){
    this.loadPosts();
  }
}
