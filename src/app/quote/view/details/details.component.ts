import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuotesService } from '../../../services/quotes.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  date: Date;
  name: string;
  mail: string;
  addressFrom: string;
  addressTo: string;
  distance: number;
  surface: number;
  atticCellar: number;
  piano: boolean;
  price: number;
  id: string;
  priceDistance: number;
  surfaceTotal: number;
  nbCar: number;
  numOffer: string;
  
  constructor(private route: ActivatedRoute, 
              private quotesService: QuotesService) { }

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

      this.priceDistance = res.priceDistance;
      this.surfaceTotal = res.totalSurface;
      this.nbCar = res.nbCar;
      this.price = res.totalPrice;
    });
  }
}
