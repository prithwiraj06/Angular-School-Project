import {Component} from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [
        { provide: CarouselConfig, useValue: { interval: 1500, noPause: true, showIndicators: true } }
      ]
})
export class HomeComponent {
    showNavigationArrows = false;
    showNavigationIndicators = false;
    kvsImages = [
        'assets/kvs/kv1.jpg',
        'assets/kvs/kv2.jpg',
        'assets/kvs/kv3.jpg',
        'assets/kvs/kv4.jpg',
        'assets/kvs/kv5.jpg',
        'assets/kvs/kv6.jpg',
        'assets/kvs/kv7.jpg',
        'assets/kvs/kv8.jpg',
        'assets/kvs/kv9.jpg',
        'assets/kvs/kv10.jpg',
    ];
  constructor() {

    }
}

