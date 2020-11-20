import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController, ModalController } from '@ionic/angular';
import { Item } from '../../models/item';
import { StockService } from '../../services/stock.service';
import { HomePopoverComponent } from '../../components/home-popover/home-popover.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NewItemModalComponent } from '../../components/new-item-modal/new-item-modal.component';
import { CreateTransModalComponent } from '../../components/create-trans-modal/create-trans-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  filterText: string = '';

  items: Item[] = []
  constructor(
    private stockService: StockService, 
    private alertController: AlertController, 
    private popoverController: PopoverController,
    private barcodeScanner: BarcodeScanner,
    private modalController: ModalController) { 
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

    popover.onDidDismiss().then( params => {
      const data = params.data;
      if (data) {
        switch (data) {
          case 'scan':
            this.scan();
            this.updateItems()
            break;
          case 'exit':
            console.log('pelotero')
            break;
          default:
            break;
        }
      }
    })
    return await popover.present();
  }

  change( event ) {
    this.filterText = event.detail.value;
  }
  doRefresh(event) {
    this.updateItems();
    event.target.complete();
  }
  async presentAlertPrompt() {
    const modal = await this.modalController.create({
      component: NewItemModalComponent
    })
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(data) {
      this.stockService.saveItem(data as Item).then( () => {
        this.updateItems();
      })
    }    
    this.updateItems();
  }

  scan() {
    this.barcodeScanner.scan().then(async (barcodeData) => {
      console.log('Barcode data', barcodeData);
      this.filterText = barcodeData.text;
    }).catch( async (err) => {
      const alert = await this.alertController.create({
        message: `Error: ${err}`,
        buttons:[
          {
            text: 'Aceptar'
          }
        ]
      })
      await alert.present()
    });
  }

  segmentChanged(event) {

  }

  async createTransaction(item, positive) {
    const modal = await this.modalController.create({
      component: CreateTransModalComponent,
      componentProps: {
        item: item.id,
        positive: positive
      }
    })
    await modal.present()
    this.updateItems()
  }

  async swipe(event, item) {
    console.log(event)
    if(event.detail.side === 'start') {
      console.log('Salida');
      await this.createTransaction(item, false)
    }
    if (event.detail.side === 'end') {
      console.log('Entrada')
      await this.createTransaction(item, true)
    }

  }


}
