import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-method',
  templateUrl: './method.component.html',
  styleUrls: ['./method.component.css']
})
export class MethodComponent implements OnInit {

  @Input() method?: string;
  @Output() methodToEmit = new EventEmitter<string>();

  @ViewChild('details', { static: false }) details: ElementRef;

  isNew = false;

  constructor() { }

  ngOnInit() {
    if (!this.method) {
      this.method = '';
      this.isNew = true;
    }
  }

  addMethod() {
    if (this.method && this.method !== '') {
      if (this.isNew) {
        this.methodToEmit.emit(this.method);
        this.method = '';
      }
    }
  }

  focusInput() {
    setTimeout(() => this.details.nativeElement.focus());
  }
}
