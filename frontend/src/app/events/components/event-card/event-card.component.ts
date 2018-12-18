import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Event} from "../../../interfaces";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input('event') event: Event;
  @Input('view') view = false;
  @ViewChild('eventImage') eventImage: ElementRef;
  timeDiff;
  timeDiffUnit;
  voted = false;

  constructor() { }

  ngOnInit() {

    let now = new Date();
    let eventCreated = new Date(this.event.created);

    console.log(now);
    console.log(eventCreated);

    let timeDiff_ms = now.getTime() - eventCreated.getTime();

    let timeDiff_m = timeDiff_ms / (60*1000);
    let timeDiff_h = timeDiff_ms / (60*60*1000);
    let timeDiff_d = timeDiff_ms / (24*60*60*1000);

    console.log(timeDiff_m, timeDiff_h, timeDiff_d);

    if(timeDiff_m < 60){
      this.timeDiff = timeDiff_m;
      this.timeDiffUnit = 'm';
    } else if(timeDiff_h < 24){
      this.timeDiffUnit = 'h';
      this.timeDiff = timeDiff_h;
    } else{
      this.timeDiffUnit = 'd';
      this.timeDiff = timeDiff_d;
    }

    this.timeDiff = Math.floor(this.timeDiff);


  }

  vote(vote: number){
    if(vote == 1){
      this.event.vote.upvoteCount += 1;
    } else if(vote == -1){
      this.event.vote.downvoteCount -= 1;
    }
    this.voted = true;
  }

  isUndefined(val) { return typeof val === 'undefined'; }

  onImageError(){
    (<HTMLImageElement>this.eventImage.nativeElement).src = '../../../../assets/placeholder.png';
  }

}
