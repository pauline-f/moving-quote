import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
              private router: Router) { }

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

  saveData() {
    const name = this.createForm.get('name').value;
    const mail = this.createForm.get('mail').value;
    const address = this.createForm.get('address').value;
    const distance = this.createForm.get('distance').value;
    const surface = this.createForm.get('surface').value;
    const atticCellar = this.createForm.get('atticCellar').value;
    const piano = this.createForm.get('piano').value;
    const packHelpful = this.createForm.get('packHelpful').value;

    this.name = name;
    this.mail = mail;
    this.address = address;
    this.distance = distance;
    this.surface = surface;
    this.atticCellar = atticCellar;
    this.piano = piano;
    this.packHelpful = packHelpful;
  }

  calculateQuote() {
    console.log("coucou");
    this.saveData();

    console.log("price distance: " + this.calculatePriceDistance(this.distance));
    console.log("total surface: " + this.calculateTotalSurface());
    console.log("nb car: " + this.calculateNbCar());

    this.totalPrice = this.calculateNbCar() * this.calculatePriceDistance(this.distance);

    console.log(this.totalPrice);

    
    this.router.navigate(['quote/view', {name:this.name, mail:this.mail, address:this.address, distance:this.distance, 
                                        surface:this.surface, atticCellar:this.atticCellar, piano:this.piano, 
                                        packHelpful:this.packHelpful, price:this.totalPrice}]);
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
