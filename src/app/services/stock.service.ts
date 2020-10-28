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

  public async getItem(id: string): Promise<void|Item> {
    let requestedItem: void|Item = await this.storage.get('items').then( items => {
      items.forEach(item => {
        let retItem: Item;
        if (item.id == id) {
          return item;
        }
        return {id: 'Not found', name:'Not Found', quantity: 0};
      });
    })
    return requestedItem;
  }

  public cleanItemStorage() {
    return this.storage.clear();
  }

  public async saveItem(item: Item) {
    let items: Item[] = await this.storage.get('items');
    let updated: boolean = false;
    items.forEach(savedItem => {
      if (savedItem.id == item.id) {
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
