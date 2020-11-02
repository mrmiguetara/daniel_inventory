import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../models/item';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {

  item: Item = {id:'None', name: 'None', quantity: 0};
  constructor(private route: ActivatedRoute, private stockService: StockService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id']; 

      this.stockService.getItem(id).then( item => {
        this.item = item;
      })
   });
  }

}
