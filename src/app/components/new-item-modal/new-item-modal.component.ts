import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-item-modal',
  templateUrl: './new-item-modal.component.html',
  styleUrls: ['./new-item-modal.component.scss'],
})
export class NewItemModalComponent implements OnInit {

  loginForm: FormGroup;

  
  constructor(
    private barcodeScanner: BarcodeScanner,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private modalController: ModalController
    ) { 
      this.loginForm = this.formBuilder.group({
        id: new FormControl('',[
          Validators.required,
        ]),
        name: new FormControl('', [
          Validators.required
        ])
      })
    }

    
    ngOnInit() {
      
    }
    
    get id() { return this.loginForm.get('id'); }
    get name() { return this.loginForm.get('name'); }

  scan() {
    this.id.setValue('toyo')
    this.barcodeScanner.scan().then(async (barcodeData) => {
      console.log('Barcode data', barcodeData);
      this.id.setValue(barcodeData.text);
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

  createItem() {
    this.modalController.dismiss({
      ...this.loginForm.value,
      quantity: 0
    })
  }
}

