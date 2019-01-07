import {Component} from '@angular/core';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'navbar-component',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    // tslint:disable-next-line:no-inferrable-types
    collapse: boolean = true;
}
