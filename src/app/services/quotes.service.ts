import { Injectable } from '@angular/core';
import { Quote } from '../models/Quote.model';
import * as firebase from 'firebase';

@Injectable()
export class QuotesService {

  constructor() { }

  getQuotes() {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('quote').once('value').then (
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  getAQuote(id:string) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('quote/'+id).once('value').then (
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewQuote(newQuote:Quote) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('quote').push(newQuote).then (
          (data) => {
            resolve(data.key);
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
}
