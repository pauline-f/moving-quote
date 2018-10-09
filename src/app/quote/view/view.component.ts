import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  distance: number;
  surface: number;
  atticCellar: number;
  piano: boolean;
  packHelpful: boolean;
  price: string;
  id: string;

  constructor(private route: ActivatedRoute, 
              private quotesService: QuotesService, 
              public router: Router) { }

  ngOnInit() {
    

    this.id = this.route.snapshot.paramMap.get('id');
    this.quotesService.getAQuote(this.id).then(res => {
      //console.log(res.name);
      //this.name = res.name;
      //this.mail = res.mail;
      //this.address = res.address;
      //this.distance = parseInt(res.distance);
      //this.surface = parseInt(res.surface);
      //this.atticCellar = parseInt(res.atticCellar);
      //this.piano = res.piano;
      //this.packHelpful = res.packHelpful;
      //this.price = res.price;
  });
  }

  viewDetails() {
    this.quotesService.getAQuote(this.id).then(res => {
      console.log(res);
      this.router.navigate(['/quote', 'view', 'details', this.id]);
    });
  }
}


