import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() data;

  @Output() eventCard = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  viewMore(): void {
    this.eventCard.emit(this.data.imdbID);
  }

}
