import { Component, OnInit } from '@angular/core';
import { QuotesService } from '../../services/quotes.service';
import { Quote } from '../../models/Quote.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  quotes: Quote[] = [];
  ids: string[] = [];

  constructor(private quotesService: QuotesService, private router:Router) { }

  ngOnInit() {
    
    this.quotesService.getAllQuote().then(all => {
      console.log(all);
      for (let quote in all) {
        //console.log(quote);
        this.quotesService.getAQuote(quote).then(q => {
          this.ids.push(quote);
          this.quotes.push(q);
        });
      }  
    });
  }

  onViewQuote(id:number) {
    console.log(this.ids[id]);
    var i = this.ids[id]
    this.router.navigate(['/quote', 'view', i]);
  }

}
