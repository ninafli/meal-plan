import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Direction } from '../../direction';

@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.css']
})
export class DirectionComponent implements OnInit {

  @Input() direction?: Direction;
  @Output() directionToEmit = new EventEmitter<Direction>();

  @ViewChild('details', { static: false }) details: ElementRef;

  isNew = false;
  constructor() { }

  ngOnInit() {
    if (!this.direction) {
      this.direction = new Direction();
      this.isNew = true;
    }

  }

  addDirection() {
    if (this.direction.details && this.direction.details !== '') {
      this.directionToEmit.emit(this.direction);
      if (this.isNew) {
        this.direction = new Direction();
      }
    }
  }

  focusInput() {
    setTimeout(() => this.details.nativeElement.focus());
  }
}
