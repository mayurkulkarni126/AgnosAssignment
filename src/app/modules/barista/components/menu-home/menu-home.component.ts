import { Component, OnInit } from '@angular/core';
import {Item} from "../../Interfaces/item";
import {Combos} from "../../Interfaces/combos";
import {MenuService} from "../../Services/menu.service";

@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.component.html',
  styleUrls: ['./menu-home.component.scss']
})
export class MenuHomeComponent implements OnInit {
  itemList: Item[] = [];
  comboList: Combos[] = [];
  currentView: string = 'menuSection' // 3 views: menuSection, billSection, orderPlacedSection
  constructor(
    private _menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    const data = this._menuService.getProductsAndCombos();
    this.itemList = data.items;
    this.comboList = data.combos;
  }

  clearData() {
    this.itemList.forEach(item=> item.qty = 0);
  }
}
