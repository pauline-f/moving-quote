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
    const distance = this.createForm.get('distance').value;
    const surface = this.createForm.get('surface').value;
    const atticCellar = this.createForm.get('atticCellar').value;
    const piano = this.createForm.get('piano').value;
    const packHelpful = this.createForm.get('packHelpful').value;

    const newQuote = new Quote(name, mail, address, distance, surface, atticCellar, piano, packHelpful)
    this.quotesService.createNewQuote(newQuote)
    .then(res => {
      console.log(res);
      this.router.navigate(['/quote', 'view', res]);
  })
    .catch(err => {
      console.log("Error while inserting quote", err);
    });

    this.calculateQuote();
  }

  calculateQuote() {

    console.log("price distance: " + this.calculatePriceDistance(this.distance));
    console.log("total surface: " + this.calculateTotalSurface());
    console.log("nb car: " + this.calculateNbCar());

    this.totalPrice = this.calculateNbCar() * this.calculatePriceDistance(this.distance);

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

  calculateTotalSurface() {
    return (this.atticCellar * 2) + this.surface;
  }

  calculateNbCar() {
    return (Math.trunc(this.calculateTotalSurface() / 50)) + 1;
  }

}
