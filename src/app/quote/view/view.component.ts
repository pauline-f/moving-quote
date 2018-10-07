import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  name: string;
  mail: string;
  address: string;
  distance: string;
  surface: string;
  atticCellar: string;
  piano: string;
  packHelpful: string;
  price: string;
  

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');
    this.mail = this.route.snapshot.paramMap.get('mail');
    this.address = this.route.snapshot.paramMap.get('address');
    this.distance = this.route.snapshot.paramMap.get('distance');
    this.surface = this.route.snapshot.paramMap.get('surface');
    this.atticCellar = this.route.snapshot.paramMap.get('atticCellar');
    this.piano = this.route.snapshot.paramMap.get('piano');
    this.packHelpful = this.route.snapshot.paramMap.get('packHelpful');
    this.price = this.route.snapshot.paramMap.get('price');
    console.log(this.distance);
    
  }
}


