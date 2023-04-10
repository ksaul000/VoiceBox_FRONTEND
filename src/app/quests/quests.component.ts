import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-quests',
  templateUrl: './quests.component.html',
  styleUrls: ['./quests.component.css']
})
export class QuestsComponent implements OnInit {

  @Input() userId: number = -1;
  @Input() questId: number = -1;
  @Input() userNickname: string = "";
  @Input() topic: string = "";
  @Input() publication_date: string = "";
  @Input() logedUserId: number =-1;
  @Output() deletedQuestEmitter = new EventEmitter();
  @Input() isCompleted: boolean = false;
  isFinished: boolean = false;
  @Output() refreshQuestsEmitter = new EventEmitter();
  @Output() addTokensLocalyEmitter = new EventEmitter();
  isLIUser: boolean = false;
  haveBadge: boolean = true;

  constructor(private service: AppService) { }

  ngOnInit(): void {
    this.checkIfCompleted(this.logedUserId, this.topic);
    this.isFinishedByThisUser();
    this.isLogedInUser();
  }
  
  formatDateString(isoString: string): string {
    const date = new Date(isoString);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'UTC',
    });
    return formattedDate;
  }

  isLogedInUser(){
    this.isLIUser = this.userId==this.logedUserId;
    console.log(this.isLIUser);
  }

  isFinishedByThisUser(){
    this.service.checkQuestFinished(this.questId, this.logedUserId).subscribe(
      (response:any) => {
        this.isFinished = response.isFinished;
        console.log(this.isFinished);
      },
      (error) => {
        const errorMesages = error.error.errorMesages.join("\n");
        alert(errorMesages);
        this.isFinished = false;
      } 
    );
  }

  deleteQuest(){
    this.service.deleteQuest(this.questId, this.logedUserId).subscribe(
      (response:any) => {
        this.deletedQuestEmitter.emit(this.questId)
    },
    (error) => {
      const errorMesages = error.error.errorMesages.join("\n");
      alert(errorMesages);
    }
    );
  }

  checkIfCompleted(userId: number, topic: string){
    const body = {UserId: userId, Topic: topic}
    this.service.checkCompletedQuest(body).subscribe(
      (response:any) => {
        this.isCompleted = response.isCompleted;
      },
      (error) => {
        this.isCompleted = false;
      }
    );

  }

  completeQuest(userId: number, topic: string){
    const body = {UserId: userId, Topic: topic}
    this.service.completeQuest(body).subscribe(
      (response:any) => {
        console.log(response);
        if(!response.isCompleted){
          const errorMesages = response.errorMesages.join("\n");
          alert(errorMesages);
          this.refreshQuestsEmitter.emit();
        }
        this.addTokensLocalyEmitter.emit();
        this.refreshQuestsEmitter.emit();
      },
      (error) => {
        const errorMesages = error.error.errorMesages.join("\n");
        alert(errorMesages);
        this.isCompleted = false;
      }
    );
  }

  doneQuest(){
    this.completeQuest(this.logedUserId, this.topic);
  }

}
