import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { Item } from '../../models/item';
import { StockService } from '../../services/stock.service';
import { HomePopoverComponent } from '../../components/home-popover/home-popover.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  item: Item = {name: 'no name', id: 'none', quantity: 0};

  filterText: string = '';

  items: Item[] = []

  constructor(private stockService: StockService, private alertController: AlertController, private popoverController: PopoverController) { 
  }

  ngOnInit() {
    this.updateItems();
  }

  updateItems() {
    this.stockService.getItems().then( items => {
      this.items = items;
    })
  }

  async showPopover( ev: any) {
    const popover = await this.popoverController.create({
      component: HomePopoverComponent,
      event: ev,
    });
    return await popover.present();

  }

  async onClick() {
    await this.stockService.saveItem({name: 'test'+ this.item.quantity, id: 'test', quantity: 0})
  }

  change( event ) {
    this.filterText = event.detail.value;
  }
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Prompt!',
      inputs: [
        {
          name: 'id',
          type: 'text',
          placeholder: 'Item ID'
        },
        {
          name: 'name',
          type: 'text',
          placeholder: 'Item name'
        },
        {
          name: 'quantity',
          type: 'number',
          min: 0,
          max: 500,
          placeholder: 'Quantity'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: async (data: any) => {
            await this.stockService.saveItem(data);
            this.updateItems()
            console.log(data)
          }
        }
      ]
    });

    await alert.present();
  }


}
