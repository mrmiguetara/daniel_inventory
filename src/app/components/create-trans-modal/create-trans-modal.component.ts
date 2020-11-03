import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-create-trans-modal',
  templateUrl: './create-trans-modal.component.html',
  styleUrls: ['./create-trans-modal.component.scss'],
})
export class CreateTransModalComponent implements OnInit {

  @Input() item: string;
  @Input() positive: boolean = false;

  diff: number = 0;
  constructor(private modalController: ModalController, private transactionService: TransactionService) { }

  ngOnInit() {}
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  change(event) {
    this.positive = event.detail.value;
  }

  createTransaction() {
    console.log(this.item)
    this.transactionService.createTransaction({itemId: this.item, date: new Date(), positive: this.positive, diff: this.diff}).then(() => {
      console.log('Done')
    })
    this.dismiss()
  }
}
