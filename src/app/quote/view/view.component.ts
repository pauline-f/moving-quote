import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quote } from '../../models/Quote.model';
import { QuotesService } from '../../services/quotes.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  name: string;
  mail: string;
  address: string;
  distance: string;
  surface: string;
  atticCellar: string;
  piano: string;
  packHelpful: string;
  price: string;
  id: string;

  quote: Quote;
  

  constructor(private route: ActivatedRoute, private quotesService: QuotesService) { }

  ngOnInit() {
    

    this.id = this.route.snapshot.paramMap.get('id');
    this.quotesService.getAQuote(this.id).then(res => {
      console.log(res.name);
      this.name = res.name;
      this.mail = res.mail;
      this.address = res.address;
      this.distance = res.distance;
      this.surface = res.surface;
      this.atticCellar = res.atticCellar;
      this.piano = res.piano;
      this.packHelpful = res.packHelpful;
      this.price = res.price;
  });
    console.log(this.id);
    
  }
}


