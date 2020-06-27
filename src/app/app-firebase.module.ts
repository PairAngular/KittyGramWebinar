import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [AngularFireModule.initializeApp(environment.firebase)],
  exports: [AngularFireAuthModule],
})
export class AppFirebaseModule {}
