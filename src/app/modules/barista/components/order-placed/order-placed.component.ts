import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.scss']
})
export class OrderPlacedComponent implements OnInit {
  @Output() onNavigate = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  navigate() {
    this.onNavigate.emit('menuSection');
  }
}
