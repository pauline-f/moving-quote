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

  constructor(private quotesService: QuotesService, private router:Router) { }

  ngOnInit() {
    
    this.quotesService.getAllQuote().then(all => {
      console.log(all);
      for (let quote in all) {
        console.log(quote);
        this.quotesService.getAQuote(quote).then(q => {
          this.quotes.push(q);
        });
      }  
    });
  }

  onViewQuote(id:number) {
    this.router.navigate(['/quote', 'view', id]);
  }

}
