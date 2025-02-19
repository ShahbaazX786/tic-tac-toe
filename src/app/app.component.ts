import { Component } from '@angular/core';
import { GameboardComponent } from './gameboard/gameboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GameboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tic-tac-toe';
}
