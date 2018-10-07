import { Injectable } from '@angular/core';
import { Quote } from '../models/Quote.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class QuotesService {

  quotes: Quote[] = [];
  quotesSubject = new Subject<Quote[]>();

  constructor() { }

  emitQuotes() {
    this.quotesSubject.next(this.quotes);
  }

  saveQuotes() {
    //firebase
  }

  getQuotes() {
    //firebase
  }

  getAQuote(id:number) {
    //Promise + firebase
  }

  createNewQuote(newQuote:Quote) {
    this.quotes.push(newQuote);
    this.saveQuotes();
    this.emitQuotes();
  }

  removeQuote(quote:Quote) {
    const quoteIndexToRemove = this.quotes.findIndex(
      (quoteEl) => {
        if(quoteEl === quote) {
          return true;
        }
      }
    );
    this.quotes.splice(quoteIndexToRemove, 1);
    this.saveQuotes();
    this.emitQuotes();
  }

}
