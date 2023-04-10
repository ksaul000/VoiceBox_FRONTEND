import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-write-post',
  templateUrl: './write-post.component.html',
  styleUrls: ['./write-post.component.css']
})
export class WritePostComponent implements OnInit {

  @Input() userId = -1;
  topic: string = '';
  hotTake: string = '';
  topicError: boolean = false;
  hotTakeError: boolean = false;
  @Output() logOutEmitter: any = new EventEmitter();
  @Output() addHotTakeEmitter: any = new EventEmitter();


  constructor(private service: AppService) { }

  ngOnInit(): void {
  }

  postHotTake() {

    this.topicError = false;
    this.hotTakeError = false;
    const body = {Content: this.hotTake, UserId: this.userId, Topic: this.addHashToTopic(this.topic)};
    this.service.postHotTake(body).subscribe(
      (response:any) => {
        this.addHotTakeEmitter.emit(response.createdHotTake);
        this.topic = '';
        this.hotTake = '';
      },
      (error) => {
        const errorMesages = error.error.errorMesages.join("\n");
        alert(errorMesages);
        if (errorMesages.includes('Content') || errorMesages.includes('Content') ) {
          this.hotTakeError = true;
        }
        if (errorMesages.includes('Topic') || errorMesages.includes('Topic') ) {
          this.topicError = true;
        }
        if (errorMesages.includes('Authentification Error!')){
          this.logOutEmitter.emit();
        }
      }
    );
  }

  addHashToTopic(topic: string): string {
    if (topic.startsWith("#")) {
      return topic;
    } else {
      return "#" + topic;
    }
  }

}
