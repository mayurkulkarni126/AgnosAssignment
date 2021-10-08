import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Item} from "../../Interfaces/item";
import {Combos} from "../../Interfaces/combos";
import {Bills} from "../../Interfaces/bills";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-bill-payments',
  templateUrl: './bill-payments.component.html',
  styleUrls: ['./bill-payments.component.scss']
})
export class BillPaymentsComponent implements OnInit, OnChanges {
  @Input() itemList: Item[] = [];
  @Input() comboList: Combos[] = [];
  @Output() onNavigate = new EventEmitter<any>();
  billArray: Bills[] = [];
  subTotal: number = 0;
  taxPercent: number = 18;
  total  = 0;
  taxAmount: number = 0;
  public billForm!: FormGroup;
  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if(this.itemList.length) {
      this.calculate();
    }
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.billForm = this._formBuilder.group({
      billAmount: ['', [Validators.required, Validators.min(1)]],
    });
  }

  navigate(navigateTo: string) {
    if (navigateTo === 'orderPlacedSection') {
      if (!this.billForm.valid || +this.billForm.controls['billAmount'].value !== this.total) {
        alert("Please Select Valid Amount.");
        return;
      }
    }
    this.onNavigate.emit(navigateTo);
  }

  calculate() {
    this.billArray = [];
    let comboIdsSelectedByUser: number[] = [];
    this.subTotal =  this.total = this.taxAmount = 0;
    const allSelectedItems = this.itemList.filter((item) => item.qty > 0);
    allSelectedItems.filter((item: Item) => {
      let offerApplied = 'No Offer';
      // Offer applied only if single qty is selected of the item which is
      // eligible in combo offer.
      if (item.isComboAvailable && item.qty === 1) {
        comboIdsSelectedByUser.push(item.itemId);
      } else {
        let itemTotal = Math.ceil(item.qty * item.price);
        if (item.discount > 0) {
          // calculate discount
          itemTotal = Math.ceil(item.qty * (item.price - item.discount));
          offerApplied = `Discount of Rs.${item.discount} Applied!!`
        } else if (item.freeItem) {
          offerApplied = `Free: Received ${item.freeItem.name} free with ${item.itemName}!!`;
        }
        const obj: Bills = {itemTotal, offerApplied, ...item};
        this.billArray.push(obj);
      }
    });
    // find combo pair and add them to bill array.
    this.getComboPairOfItems(comboIdsSelectedByUser);
    //calculate sub total, tax and total
    this.billArray.forEach(bill => {
      this.subTotal += bill.itemTotal;
    });
    this.taxAmount = parseFloat((this.subTotal * (this.taxPercent / 100)).toFixed(2));
    const grandTotal = this.subTotal + (this.subTotal * (this.taxPercent / 100));
    this.total = parseFloat(grandTotal.toFixed(2));
  }

  getComboPairOfItems(comboIdsSelectedByUser: number[]) {
    //Combo pair is selected on first match basis. For ex. if for combo
    //of (item1 + item2) and (item1 + item3), `item1 + item2` combo will be selected.
    this.comboList.forEach(combo => {
      const comboArray = [combo.item1Id, combo.item2Id];
      // check if pair combo matches any pair of item selected by user
      // that are eligible for combo.
      if(comboArray.every(val => comboIdsSelectedByUser.includes(val))) {
        // remove selected pair as those pairs are selected in combo.
        comboIdsSelectedByUser = comboIdsSelectedByUser.filter((item) => !comboArray.includes(item));
        // add item in bill array.
        const itemDetails: Bills = {
          itemName: `${combo.item1Name} + ${combo.item2Name}`,
          price: combo.price,
          qty: 1,
          discount: 0,
          offerApplied: 'COMBO OFFER APPLIED!',
          itemTotal: combo.price
        }
        this.billArray.push(itemDetails);
      }
    });
    // All remaining items are those which could not get any other combo pair,
    // will be sold individually.
    comboIdsSelectedByUser.forEach(id => {
      const itemDetails = this.itemList.find(item => id === item.itemId);
      if (itemDetails) {
        const billItem: Bills = {
          itemName: itemDetails.itemName,
          price: itemDetails.price,
          qty: 1,
          discount: 0,
          offerApplied: 'No Offer',
          itemTotal: itemDetails.price
        };
        this.billArray.push(billItem);
      }
    });
  }
}
