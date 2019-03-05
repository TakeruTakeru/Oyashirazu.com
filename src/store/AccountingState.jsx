import { observable, computed, action, decorate } from "mobx";
import { AccountingItemModel } from "../model/model";

class AccountingState {
  items = [];

  addItem(name) {
    //prevent from same name item and false value.
    !name|| this.items.some(item => {
        return item.name == name;
    }) || this.items.push(new AccountingItemModel(name));
    return this.items;
  }

  deleteItems() {
      this.items = [];
  }

  get getItems() {
    return this.items;
  }

  onChangeFee(name, fee) {
    //   console.log(name, fee)
    let newItems = this.items.map(item => {
        item.fee = item.name === name ? fee : item.fee;
        return item;
    });
    this.items = newItems;
  }

doSettlement(name) {
    let newItems = this.items.map(item => {
        item.isConfirmed = item.name === name;
        return item;
    });
    this.items = newItems;
}

}

export default decorate(AccountingState, {
  items: observable,
  addItem: action,
  deleteItems: action,
  getItems: computed,
　onChangeFee: action,
 doSettlement: action,
});
