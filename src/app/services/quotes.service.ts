import { Injectable } from '@angular/core';
import { Quote } from '../models/Quote.model';
import * as firebase from 'firebase';
import { AuthGuardService } from './auth-guard.service';

@Injectable()
export class QuotesService {

  constructor(private authGuardService:AuthGuardService) { }

  getAQuote(id:string) {
    return new Promise<Quote>(
      (resolve, reject) => {
        firebase.database().ref('quote/' + this.getUserUid() + "/" + id).once('value').then (
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  getAllQuote() {
    return new Promise<Quote[]>(
      (resolve, reject) => {
        firebase.database().ref('quote/' + this.getUserUid()).once('value', (data) => {
            resolve(data.val());
          }, () => {
            resolve([]);
          }
        );
      }
    );
  }

  createNewQuote(newQuote:Quote) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('quote/' + this.getUserUid()).push(newQuote).then (
          (data) => {
            resolve(data.key);
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  removeQuote(id: string) {
    firebase.database().ref('quote/' + this.getUserUid() + '/' + id + '/').remove();
  }

  getUserUid() {
    return this.authGuardService.getUid();
  }

  calculateQuote(distance:number, surface:number, atticCellar:number, piano:boolean) {
    const surfaceTotal = this.calculateTotalSurface(surface, atticCellar);
    var totalPrice = this.calculateNbCar(surfaceTotal) * this.calculatePriceDistance(distance);
    if(piano) {
      totalPrice += 5000;
    }
    return totalPrice
  }

  calculatePriceDistance(distance:number) {
    if (distance < 50) {
      return 1000 + (distance * 10);
    } else if ((distance >= 50) && (distance < 100)) {
      return 5000 + (distance * 8);
    } else {
      return 10000 + (distance * 7);
    }
  }

  calculateTotalSurface(surface:number, atticCellar:number) {
    return (atticCellar * 2) + surface;
  }

  calculateNbCar(surfaceTotal:number) {
    return (Math.trunc(surfaceTotal / 50)) + 1;
  }
}
