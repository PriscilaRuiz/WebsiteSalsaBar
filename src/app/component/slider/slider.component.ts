import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-slider',
  standalone: true,
	imports: [NgbCarouselModule, NgIf],
  templateUrl: './slider.component.html', 
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent {
  images = [
    './assets/img/baneruno.png',
    './assets/img/banerdos.png',
    './assets/img/baneruno.png'
  ];;
}
