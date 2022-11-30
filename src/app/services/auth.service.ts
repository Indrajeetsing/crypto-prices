import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<User>;
  constructor(
    private auth: AngularFireAuth,
    private readonly afs: AngularFirestore
  ) {
    this.auth.authState.subscribe((user) => {
      console.log(user);
    });
    this.usersCollection = afs.collection<User>('users');
  }

  authState(): Observable<firebase.User | null> {
    return this.auth.authState;
  }

  signUp(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  addUser(user: User) {
    return this.usersCollection.doc(user.id).set(user);
  }
}

export interface User {
  id: string;
  name: string;
  email: string;
  last_updated: Date;
}
