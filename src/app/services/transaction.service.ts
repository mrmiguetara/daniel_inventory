import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Transaction } from '../models/transaction';
import { Item } from '../models/item';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private storage: Storage) {
    storage.keys().then( keys => {
      if (keys.indexOf('transactions') == -1) {
        storage.set('transactions', Array<Transaction>())
      }
    })
  }

  public async getTransactionsForItem(itemId: string) {
    const allTrans = await this.storage.get('transactions').then( transactions => transactions)
    console.log(allTrans)
    let resTransactions: Array<Transaction> = [];
    return new Promise<Array<Transaction>>( (resolve, reject) => {
      allTrans.forEach(trans => {
        if (trans.itemId == itemId) {
          resTransactions.push(trans);
          console.log('Pushd')
        }
      });
      console.log(resTransactions)
      resolve(resTransactions);
    })
  }
  private async updateItem( item: Item) {
    const allItems = await this.storage.get('items');
    allItems.forEach(savedItem => {
      if (savedItem.id == item.id) {
        savedItem.quantity = Number(item.quantity) + Number(savedItem.quantity);
      }
    });

    this.storage.set('items', allItems)
  }
  public async createTransaction(transaction: Transaction) {
    const allTrans: Array<Transaction> = await this.storage.get('transactions');
    console.log(allTrans)
    allTrans.push(transaction);
    this.updateItem({id: transaction.itemId, name: '', quantity: (Number(transaction.diff) * (transaction.positive? 1: -1))})
    await this.storage.set('transactions', allTrans);
  }
}
