import { observable, computed, action, decorate } from "mobx";
import { AccountingItemModel } from "../model/model";

class AccountingState {
  items = [];

  addItem(name) {
    //prevent from same name item and false value.
    !name ||
      this.items.some(item => {
        return item.name == name;
      }) ||
      this.items.push(new AccountingItemModel(name));
    return this.items;
  }

  deleteItems() {
    this.items = [];
  }

  get getItems() {
    return this.items.slice().reverse();
  }

  onChangeFee(name, fee) {
    //   console.log(name, fee)
    if (isNaN(fee) || fee === '') return;
    const parsedFee = parseInt(fee, 10);
    if (parsedFee < 0) return;
    let newItems = this.items.map(item => {
      item.fee = item.name === name ? parsedFee : item.fee;
      return item;
    });
    this.items = newItems;
  }

  onChangeRate(name, value) {
    let newItems = this.items.map(item => {
      item.name === name && (item.userRate = value);
      return item;
    });
    this.items = newItems;
  }

  doSettlement(name) {
    let newItems = this.items.map(item => {
      item.name === name && (item.isConfirmed = true);
      return item;
    });
    this.items = newItems;
  }

  deleteItem(name) {
    let newItems = this.items.filter(item => {
      return item.name !== name
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
  onChangeRate: action,
  doSettlement: action,
  deleteItem: action,
});
