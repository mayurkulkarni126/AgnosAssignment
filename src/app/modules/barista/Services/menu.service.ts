import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Item} from "../Interfaces/item";
import {Combos} from "../Interfaces/combos";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  // //create subject for passing data to bill.
  itemList: Item[] = [{
    itemId: 1,
    itemName: 'Espresso',
    price: 100,
    qty: 0,
    discount: 0,
    description: '',
    freeItem: 0,
    isComboAvailable: true,
    imageUrl: 'assets/images/espresso.png'
  },
    {
      itemId: 2,
      itemName: 'Iced Cafe Mocha',
      price: 215,
      qty: 0,
      discount: 0,
      description: '',
      freeItem: 0,
      isComboAvailable: false,
      imageUrl: 'assets/images/iced-cafe-mocha.png'
    },
    {
      itemId: 10,
      itemName: 'Garlic Bread',
      price: 120,
      qty: 0,
      discount: 0,
      description: '',
      freeItem: 0,
      isComboAvailable: true,
      imageUrl: 'assets/images/garlic-bread.png'
    },
    {
      itemId: 3,
      itemName: 'CAPPUCCINO',
      price: 130,
      qty: 0,
      discount: 30,
      description: '',
      freeItem: 0,
      isComboAvailable: false,
      imageUrl: 'assets/images/cappuccino.png'
    },
    {
      itemId: 4,
      itemName: 'Hot Chocolate',
      price: 105,
      qty: 0,
      discount: 20,
      description: '',
      freeItem: 0,
      isComboAvailable: false,
      imageUrl: 'assets/images/hot-chocolate.png'
    },
    {
      itemId: 5,
      itemName: 'Iced Americano',
      price: 215,
      qty: 0,
      discount: 0,
      description: '',
      freeItem: 0,
      isComboAvailable: false,
      imageUrl: 'assets/images/iced-americano.png'
    },
    {
      itemId: 6,
      itemName: 'Black Tea',
      price: 205,
      qty: 0,
      discount: 0,
      description: '',
      freeItem: {id: 8, name: 'Vegitariano Puff'},
      isComboAvailable: false,
      imageUrl: 'assets/images/black-tea.png'
    },
    {
      itemId: 7,
      itemName: 'Chocolate Smoothie',
      price: 230,
      qty: 0,
      discount: 0,
      description: '',
      freeItem: null,
      isComboAvailable: true,
      imageUrl: 'assets/images/chocolate-smoothie.png'
    },
    {
      itemId: 8,
      itemName: 'Vegitariano Puff',
      price: 90,
      qty: 0,
      discount: 0,
      description: '',
      freeItem: 0,
      isComboAvailable: false,
      imageUrl: 'assets/images/veg-puff.png'
    },
    {
      itemId: 9,
      itemName: 'Mix Veg Momos',
      price: 105,
      qty: 0,
      discount: 0,
      description: '',
      freeItem: 0,
      isComboAvailable: true,
      imageUrl: 'assets/images/veg-momos.png'
    },
  ];
  comboList: Combos[] = [
    {
      item1Id: 1,
      item2Id: 10,
      item1Name: 'Espresso',
      item2Name: 'Garlic Bread',
      price: 190
    },
    {
      item1Id: 1,
      item2Id: 9,
      item1Name: 'Espresso',
      item2Name: 'Mix Veg Momos',
      price: 180
    },
    {
      item1Id: 7,
      item2Id: 9,
      item1Name: 'Chocolate Smoothie',
      item2Name: 'Mix Veg Momos',
      price: 300
    },
  ];
  constructor() { }

  getProductsAndCombos() {
    return {items: this.itemList, combos: this.comboList};
  }
}
