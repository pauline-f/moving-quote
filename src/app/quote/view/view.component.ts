import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuotesService } from '../../services/quotes.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  date: Date;
  name: string;
  mail: string;
  addressFrom: string;
  addressTo: string;
  distance: number;
  surface: number;
  atticCellar: number;
  piano: boolean;
  totalPrice: number;
  numOffer: string;

  id: string;

  constructor(private route: ActivatedRoute, 
              private quotesService: QuotesService, 
              public router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.quotesService.getAQuote(this.id).then(res => {
      this.numOffer = this.id;
      this.date = res.dateQuote;
      this.name = res.name;
      this.mail = res.mail;
      this.addressFrom = res.addressFrom;
      this.addressTo = res.addressTo;
      this.distance = res.distance;
      this.surface = res.surface;
      this.atticCellar = res.atticCellar;
      this.piano = res.piano;
      this.totalPrice = res.totalPrice;
  });
  }

  viewDetails() {
    this.quotesService.getAQuote(this.id).then(res => {
      this.router.navigate(['/quote', 'view', 'details', this.id]);
    });
  }
}


