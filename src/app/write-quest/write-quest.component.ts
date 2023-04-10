import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-write-quest',
  templateUrl: './write-quest.component.html',
  styleUrls: ['./write-quest.component.css']
})
export class WriteQuestComponent implements OnInit {

  @Input() userId = -1;
  topic: string = '';
  topicError: boolean = false;
  @Output() addQuestEmitter: any = new EventEmitter();
  @Output() pay30TokensEmitter: any = new EventEmitter();

  constructor(private service: AppService) { }

  ngOnInit(): void {
  }

  postQuest() {

    this.topicError = false;
    const body = {Topic: this.addHashToTopic(this.topic), UserID: this.userId};
    this.service.postQuest(body).subscribe(
      (response:any) => {
        this.addQuestEmitter.emit(response.createdQuest);
        this.topic = '';
        this.pay30TokensEmitter.emit();

      },
      (error) => {
        const errorMesages = error.error.errorMesages.join("\n");
        alert(errorMesages);
        if (errorMesages.includes('Topic')) {
          this.topicError = true;
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
