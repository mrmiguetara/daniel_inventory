import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../models/item';
import { StockService } from '../../services/stock.service';
import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../services/transaction.service';
import { AlertController, ModalController } from '@ionic/angular';
import { CreateTransModalComponent } from '../../components/create-trans-modal/create-trans-modal.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {

  item: Item = {id:'None', name: 'None', quantity: 0};
  transactions: Array<Transaction> = [];

  itemForm = new FormGroup({
    id: new FormControl(this.item.id,[
      Validators.required,
    ]),
    name: new FormControl(this.item.name, [
      Validators.required
    ]),
    quantity: new FormControl(this.item.quantity, [
      Validators.required
    ])
  })

  get id() {return this.itemForm.get('id')}
  get name() {return this.itemForm.get('name')}
  get quantity() {return this.itemForm.get('quantity')}
  constructor(
    private route: ActivatedRoute,
    private stockService: StockService,
    private transactionService: TransactionService,
    private modalController: ModalController,
    private alertController: AlertController) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id']; 

      this.updateItem(id);
      this.updateTransactions(id)
   });
  }
  updateItem(id) {
    this.stockService.getItem(id).then( item => {
      this.item = item;
      this.id.setValue(item.id)
      this.name.setValue(item.name)
      this.quantity.setValue(item.quantity)
    })
  }
  onSubmit() {
    this.stockService.saveItem({
      ...this.itemForm.value,
    }).then( async () => {
      const alert = await this.alertController.create({
        message: 'El elemento ha sido actualizado satisfactoriamente.'
      })
      await alert.present()
    })
  }
  updateTransactions(id: string) {
    this.transactionService.getTransactionsForItem(id).then( trans => {
      this.transactions = trans;
    })
  }
  
  async presentModal(positive: boolean) {
    const modal = await this.modalController.create({
      component: CreateTransModalComponent,
      componentProps: {
        item: this.item.id,
        positive: positive
      }
    });
    await modal.present();

    modal.onDidDismiss().then( data => {
      this.updateItem(this.item.id)
      this.updateTransactions(this.item.id);
      
    })
  }

}
