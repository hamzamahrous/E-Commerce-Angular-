import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
  host: {
    class: 'flex justify-center items-center mt-6',
  },
})
export class SpinnerComponent {}
