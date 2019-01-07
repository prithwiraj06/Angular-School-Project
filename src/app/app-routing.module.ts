import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { GetStudentsComponent } from './StudentsComponent/GetStudents/getStudents.component';
import { HomeComponent } from './HomeComponent/home.component';
import { GetTeacherComponent } from './TeachersComponent/GetTeachers/getTeacher.component';
import { ContactComponent } from './ContactComponent/contact.component';
const appRoutes: Routes = [
    {path: 'students', component: GetStudentsComponent},
    {path: 'home', component: HomeComponent},
    {path: 'teachers', component: GetTeacherComponent},
    {path: 'contacts', component: ContactComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'}
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
