import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Item} from "../../Interfaces/item";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {ComboInfoModalComponent} from "../combo-info-modal/combo-info-modal.component";
import {Combos} from "../../Interfaces/combos";

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss']
})
export class MenuItemsComponent implements OnInit, OnChanges {

  itemsAdded: boolean = false;
  @Input() itemList: Item[] = [];
  @Input() comboList: Combos[] = [];
  @Output() onProceedToBill = new EventEmitter<any>();
  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnChanges(): void {
    this.checkItemQtyStatus();
  }

  ngOnInit(): void {
  }

  onItemQtyClick(item: Item, action: string) {
    //if minus then subtract else add
    item.qty = (action === '-') ? (item.qty === 0 ? item.qty : item.qty -1 ) :
      ++item.qty;
    this.checkItemQtyStatus();
  }
  checkItemQtyStatus() {
    //check item added status
    this.itemsAdded = this.itemList.findIndex((item) => item.qty > 0) > -1;
  }
  openModal(itemDetails: Item) {
    //show all combo info of selected item
    const combosOfSelectedItem = this.comboList.filter((item) =>
      (itemDetails.itemId === item.item1Id || itemDetails.itemId === item.item2Id));
    const modalInstance = this.modalService.open(ComboInfoModalComponent, {
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      keyboard: false,
    });
    modalInstance.componentInstance.comboData = combosOfSelectedItem;
    modalInstance.componentInstance.currentItemName = itemDetails.itemName;
  }

  proceedToBillPayment() {
    console.log(this.itemList);
    this.onProceedToBill.emit('billSection');
  }
}
