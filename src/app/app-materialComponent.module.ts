import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
    imports: [
        MatButtonModule,
        MatSelectModule
        ],
    exports: [
        MatButtonModule,
        MatSelectModule
    ]
})
export class MaterialComponentModule {

}
