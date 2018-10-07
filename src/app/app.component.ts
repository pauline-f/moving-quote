import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor() {
    var config = {
      apiKey: "AIzaSyC1ZduxX8jnEx3gopU_eR_5l_QYxOmv6AA",
      authDomain: "moveit-8b1d7.firebaseapp.com",
      databaseURL: "https://moveit-8b1d7.firebaseio.com",
      projectId: "moveit-8b1d7",
      storageBucket: "moveit-8b1d7.appspot.com",
      messagingSenderId: "999261636272"
    };
    firebase.initializeApp(config);
  }
}


