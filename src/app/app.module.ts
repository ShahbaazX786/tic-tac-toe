import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NbLayoutModule, NbThemeModule, NbButtonModule } from '@nebular/theme';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { SquareComponent } from './square/square.component';

@NgModule({
  declarations: [AppComponent, GameboardComponent, SquareComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
