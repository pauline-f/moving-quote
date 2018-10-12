import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuotesService } from '../../services/quotes.service';
import { Quote } from '../../models/Quote.model';
import * as firebase from 'firebase';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private quotesService: QuotesService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.createForm = this.formBuilder.group( {
      name: ['', Validators.required],
      mail: ['', Validators.required],
      addressFrom: ['', Validators.required],
      addressTo: ['', Validators.required],
      distance: ['', [Validators.required, Validators.pattern(/[0-9]/)]],
      surface: ['', [Validators.required, Validators.pattern(/[0-9]/)]],
      atticCellar: ['', [Validators.required, Validators.pattern(/[0-9]/)]],
      piano: [false, Validators.required],
    });
  }

  onSaveData() {
    const name = this.createForm.get('name').value;
    const mail = this.createForm.get('mail').value;
    const addressFrom = this.createForm.get('addressFrom').value;
    const addressTo = this.createForm.get('addressTo').value;
    const distance = parseInt(this.createForm.get('distance').value);
    const surface = parseInt(this.createForm.get('surface').value);
    const atticCellar = parseInt(this.createForm.get('atticCellar').value);
    const piano = this.createForm.get('piano').value;

    const priceDistance = this.quotesService.calculatePriceDistance(distance);
    const totalSurface = this.quotesService.calculateTotalSurface(surface, atticCellar);
    const nbCar = this.quotesService.calculateNbCar(totalSurface);
    const totalPrice = this.quotesService.calculateQuote(distance, surface, atticCellar, piano);
    const date = firebase.database.ServerValue.TIMESTAMP;

    const newQuote = new Quote(date, name, mail, addressFrom, addressTo, distance, surface, atticCellar, 
                        piano, priceDistance, totalSurface, nbCar, totalPrice);
    this.quotesService.createNewQuote(newQuote)
    .then(res => {
      console.log(res);
      this.router.navigate(['/quote', 'view', res]);
  })
    .catch(err => {
      console.log("Error while inserting quote", err);
    });

    
  }


}
