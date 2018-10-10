import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuotesService } from '../../services/quotes.service';
import { Quote } from '../../models/Quote.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  date: Date;
  name: string;
  mail: string;
  addressFrom: string;
  addressTo: string;
  distance: number;
  surface: number;
  atticCellar: number;
  piano: boolean;
  packHelpful: boolean;
  priceDistance: number;
  totalSurface: number;
  nbCar: number;
  totalPrice: number;
  numOffre: string;

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
      distance: ['', Validators.required],
      surface: ['', Validators.required],
      atticCellar: ['', Validators.required],
      piano: [false, Validators.required],
      packHelpful: [false, Validators.required],
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
    const packHelpful = this.createForm.get('packHelpful').value;
    
    this.priceDistance = this.quotesService.calculatePriceDistance(distance);
    this.totalSurface = this.quotesService.calculateTotalSurface(surface, atticCellar);
    this.nbCar = this.quotesService.calculateNbCar(this.totalSurface);
    this.totalPrice = this.quotesService.calculateQuote(distance, surface, atticCellar, piano);
    this.date = new Date();
    this.numOffre = new Date().getFullYear().toString() + new Date().getMonth().toString() + new Date().getDay().toString() + new Date().getHours().toString() + new Date().getMinutes().toString() + new Date().getSeconds().toString() + new Date().getMilliseconds().toString();
    
    console.log(new Date().getFullYear().toString());
    console.log(new Date().getMonth().toString());
    console.log(new Date().getDate().toString());
    console.log(new Date().getHours().toString());
    console.log(new Date().getMinutes().toString());
    console.log(new Date().getSeconds().toString());
    console.log(new Date().getMilliseconds().toString());


    console.log(this.date);
    const newQuote = new Quote(this.date, this.numOffre, name, mail, addressFrom, addressTo, distance, surface, atticCellar, 
                        piano, packHelpful,this.priceDistance, this.totalSurface, this.nbCar, this.totalPrice);
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
