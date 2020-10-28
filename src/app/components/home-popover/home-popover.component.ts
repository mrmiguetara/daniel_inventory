import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-home-popover',
  templateUrl: './home-popover.component.html',
  styleUrls: ['./home-popover.component.scss'],
})
export class HomePopoverComponent implements OnInit {

  constructor(private stockService: StockService, private popoverController: PopoverController) { }

  ngOnInit() {}

  sendSignal(msg: string) {
    this.popoverController.dismiss(msg);
  }

}
