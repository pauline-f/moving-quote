import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class UserService {

  constructor() { }

  createNewUser(mail:string, password:string) {
    return new Promise (
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(mail, password).then (
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  loginUser(mail:string, password:string) {
    return new Promise (
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(mail, password).then (
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser() {
    firebase.auth().signOut();
  }

}
