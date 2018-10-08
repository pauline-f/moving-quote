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
  name: string;
  mail: string;
  address: string;
  distance: number;
  surface: number;
  atticCellar: number;
  piano: boolean;
  packHelpful: boolean;
  totalPrice: number;

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
      address: ['', Validators.required],
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
    const address = this.createForm.get('address').value;
    const distance = parseInt(this.createForm.get('distance').value);
    const surface = parseInt(this.createForm.get('surface').value);
    const atticCellar = parseInt(this.createForm.get('atticCellar').value);
    const piano = this.createForm.get('piano').value;
    const packHelpful = this.createForm.get('packHelpful').value;

    this.calculateQuote(distance, surface, atticCellar, piano);

    const newQuote = new Quote(name, mail, address, distance, surface, atticCellar, piano, packHelpful, this.totalPrice)
    this.quotesService.createNewQuote(newQuote)
    .then(res => {
      console.log(res);
      this.router.navigate(['/quote', 'view', res]);
  })
    .catch(err => {
      console.log("Error while inserting quote", err);
    });

    
  }

  calculateQuote(distance:number, surface:number, atticCellar:number, piano:boolean) {
    const surfaceTotal = this.calculateTotalSurface(surface, atticCellar);
    console.log("price distance: " + this.calculatePriceDistance(distance));
    console.log("total surface: " + surfaceTotal);
    console.log("nb car: " + this.calculateNbCar(surfaceTotal));

    this.totalPrice = this.calculateNbCar(surfaceTotal) * this.calculatePriceDistance(distance);
    if(piano) {
      this.totalPrice += 5000;
    }

    console.log(this.totalPrice);
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
