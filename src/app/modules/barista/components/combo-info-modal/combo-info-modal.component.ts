import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Combos} from "../../Interfaces/combos";

@Component({
  selector: 'app-combo-info-modal',
  templateUrl: './combo-info-modal.component.html',
  styleUrls: ['./combo-info-modal.component.scss']
})
export class ComboInfoModalComponent implements OnInit {
  @Input() comboData: Combos[] = [];
  @Input() currentItemName: string = '';
  constructor(
    public modal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  closePopup(): void {
    this.modal.close();
  }
}
