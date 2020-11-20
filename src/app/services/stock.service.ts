import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private storage: Storage) {
    
    storage.keys().then( keys => {
      if (keys.indexOf('items') === -1 ) {
        storage.set('items', Array<Item>());
      }
    })
    
  }

  public getItems() {
    return this.storage.get('items')
  }

  public async getItem(id: string): Promise<Item> {
    const allItems = await this.getItems().then( items => items)
    return new Promise( (resolve, reject) => {
      allItems.forEach(item => {
        if (item.id == id) {
          resolve(item)
        }
      });
      reject('Not found')
    })
  }

  public cleanItemStorage() {
    return this.storage.clear();
  }

  public async saveItem(item: Item) {
    let items: Item[] = await this.storage.get('items');
    let updated: boolean = false;
    items.forEach(savedItem => {
      if (savedItem.id == item.id) {
        savedItem.name = item.name;
        savedItem.quantity = Number(item.quantity) + Number(savedItem.quantity);
        updated = true;
      }
    });

    if (!updated) {
      items.push(item)
    }
    this.storage.set('items', items)
  }
}
