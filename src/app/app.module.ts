// Angular pre-built modules and node modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {ToastyModule} from 'ng2-toasty';
import { CarouselModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

// components, routing and material
import { AppComponent } from './app.component';
import { NavbarComponent } from './NavbarComponent/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { GetStudentsComponent } from './StudentsComponent/GetStudents/getStudents.component';
import { AddEditStudentComponent } from './StudentsComponent/AddEditStudent/addEditStudent.component';
import { HomeComponent } from './HomeComponent/home.component';
import { ContactComponent } from './ContactComponent/contact.component';
import { GetTeacherComponent } from './TeachersComponent/GetTeachers/getTeacher.component';
import { AddEditTeacherComponent } from './TeachersComponent/AddEditTeacher/addEditTeacher.component';
import { MaterialComponentModule } from './app-materialComponent.module';

// services
import { StudentService } from './Services/students.service';
import { AlertService } from './Services/AlertService';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GetStudentsComponent,
    AddEditStudentComponent,
    HomeComponent,
    ContactComponent,
    GetTeacherComponent,
    AddEditTeacherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgxDatatableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialComponentModule,
    ToastyModule.forRoot(),
    ModalModule.forRoot(),
    CarouselModule,
    NgSelectModule
  ],
  providers: [StudentService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
