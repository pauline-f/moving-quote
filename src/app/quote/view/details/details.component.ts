import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuotesService } from '../../../services/quotes.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  name: string;
  mail: string;
  address: string;
  distance: number;
  surface: number;
  atticCellar: number;
  piano: boolean;
  packHelpful: boolean;
  price: number;
  id: string;
  priceDistance: number;
  surfaceTotal: number;
  nbCar: number;
  offerNum: string;
  

  constructor(private route: ActivatedRoute, 
              private quotesService: QuotesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.offerNum = this.id;
    this.quotesService.getAQuote(this.id).then(res => {
      this.name = res.name;
      this.mail = res.mail;
      this.address = res.address;
      this.distance = parseInt(res.distance);
      this.surface = parseInt(res.surface);
      this.atticCellar = parseInt(res.atticCellar);
      this.piano = res.piano;
      this.packHelpful = res.packHelpful;

      this.priceDistance = this.quotesService.calculatePriceDistance(this.distance);
      this.surfaceTotal = this.quotesService.calculateTotalSurface(this.surface, this.atticCellar);
      this.nbCar = this.quotesService.calculateNbCar(this.surfaceTotal);
      this.price = this.quotesService.calculateQuote(this.distance, this.surface, this.atticCellar, this.piano);
    });
  }


}
