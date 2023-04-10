import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from '../app.service';
import { Console } from 'console';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  @Input() postData: any = {};
  @Input() userId: number = -1;
  agreeButtonPressed: boolean = false;
  disagreeButtonPressed: boolean = false;
  unclearButtonPressed: boolean = false;
  agreeReactionNumber: number = 0;
  unclearReactionNumber: number = 0;
  disagreeReactionNumber: number = 0;
  @Output() deletedHotTakeEmitter = new EventEmitter();
  haveBadge: boolean = false;
  @Input() top3: any = [{id:-1}, {id:-1}, {id:-1}]
  isInTop3: boolean = false;



  constructor(private service: AppService) { }

  ngOnInit(): void {
    this.initReactionOfUser();
    this.initNumbersOfReactions();
    this.getBadge();
    this.verifyTop3();
  }

  verifyTop3(){
    if(this.postData.UserId==this.top3[0].id || this.postData.UserId==this.top3[1].id || this.postData.UserId==this.top3[2].id){
      this.isInTop3=true;
    }

  }

  initReactionOfUser(){
    this.service.getReactionsOfLogedInUser({UserId: this.userId, HotTakeId: this.postData.Id}).subscribe(
      (response:any) => {
        this.agreeButtonPressed=response.agree_pressed;
        this.unclearButtonPressed=response.unclear_pressed;
        this.disagreeButtonPressed=response.disagree_pressed;
    },
    (error) => {
      const errorMesages = error.error.errorMesages.join("\n");
      alert(errorMesages);
    }
    );
  }

  initNumbersOfReactions(){
    this.service.getReactionsOfHotTake(this.postData.Id).subscribe(
      (response:any) => {
        this.agreeReactionNumber=response.agree_count;
        this.unclearReactionNumber=response.unclear_count;
        this.disagreeReactionNumber=response.disagree_count;
    },
    (error) => {
      const errorMesages = error.error.errorMesages.join("\n");
      alert(errorMesages);
    }
    );
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
    return this.userId==this.postData.UserId;
  }

  reactAgree(){
    if(!this.agreeButtonPressed){
      this.agreeReactionNumber = this.agreeReactionNumber+1;
      this.agreeButtonPressed = true;
      if(this.disagreeButtonPressed){
        this.disagreeButtonPressed = false;
        this.disagreeReactionNumber = this.disagreeReactionNumber-1;
      }
      if(this.unclearButtonPressed){
        this.unclearButtonPressed = false;
        this.unclearReactionNumber = this.unclearReactionNumber-1;
      }
      this.service.addReact({UserId: this.userId, HotTakeId: this.postData.Id, ReactType: 'AGREE'}).subscribe(
        (response:any) => {
          
      },
      (error) => {
        const errorMesages = error.error.errorMesages.join("\n");
        alert(errorMesages);
      }
      );
    }
  }

  reactUnclear(){
    if(!this.unclearButtonPressed){
      this.unclearReactionNumber = this.unclearReactionNumber+1;
      this.unclearButtonPressed = true;
      if(this.disagreeButtonPressed){
        this.disagreeButtonPressed = false;
        this.disagreeReactionNumber = this.disagreeReactionNumber-1;
      }
      if(this.agreeButtonPressed){
        this.agreeButtonPressed = false;
        this.agreeReactionNumber = this.agreeReactionNumber-1;
      }
      this.service.addReact({UserId: this.userId, HotTakeId: this.postData.Id, ReactType: 'Opinion Is Unclear'}).subscribe(
        (response:any) => {
          
      },
      (error) => {
        const errorMesages = error.error.errorMesages.join("\n");
        alert(errorMesages);
      }
      );
    }
  }

  reactDisagree(){
    if(!this.disagreeButtonPressed){
      this.disagreeReactionNumber = this.disagreeReactionNumber+1;
      this.disagreeButtonPressed = true;
      if(this.unclearButtonPressed){
        this.unclearButtonPressed = false;
        this.unclearReactionNumber = this.unclearReactionNumber-1;
      }
      if(this.agreeButtonPressed){
        this.agreeButtonPressed = false;
        this.agreeReactionNumber = this.agreeReactionNumber-1;
      }
      this.service.addReact({UserId: this.userId, HotTakeId: this.postData.Id, ReactType: 'DISAGREE'}).subscribe(
        (response:any) => {
          
      },
      (error) => {
        const errorMesages = error.error.errorMesages.join("\n");
        alert(errorMesages);
      }
      );
    }
  }

  deleteHotTake(){
    this.service.deleteHotTake(this.postData.Id, this.userId).subscribe(
      (response:any) => {
        this.deletedHotTakeEmitter.emit(this.postData.Id)
    },
    (error) => {
      const errorMesages = error.error.errorMesages.join("\n");
      alert(errorMesages);
    }
    );
  }

  getBadge(){
    this.service.getBadge(this.postData.UserId).subscribe(
      (response:any) => {
        this.haveBadge=response.badge;
      },
      (error) => {
        this.haveBadge=false;
      } 
    );
    this.haveBadge = false
  }



}
