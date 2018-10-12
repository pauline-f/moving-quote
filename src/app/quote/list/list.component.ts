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
      for (let id in all) { // Browse all keys
        this.ids.push(id); // Store ids
        this.quotes.push(all[id]); // Get quote by id
      }
    });
  }

  onViewQuote(index:number) {
    this.router.navigate(['/quote', 'view', this.ids[index]]);
  }

  onDeleteQuote(index:number) {
    this.quotesService.removeQuote(this.ids[index]);
    this.quotes.splice(index,1);
    this.ids.splice(index, 1);
  }

}
