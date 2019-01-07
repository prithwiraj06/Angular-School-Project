import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Student } from '../../Models/student.model';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
@Injectable()
export class StudentService {
    appUrl: string = null;
    constructor(private _httpClient: HttpClient) {
        this.appUrl = 'http://localhost:21479/api/Students/';
    }
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
    };
    GetAllStudents(): Observable<Student[]> {
        return this._httpClient.get<Student[]>(this.appUrl + 'GetAllStudents').pipe(catchError(this.handleError));
    }
    GetStudentByEnrollmentNumber(enrollmentNumber: number): Observable<Student> {
        return this._httpClient.get<Student>(this.appUrl + 'GetStudentByEnrollmentNumber/' + enrollmentNumber)
        .pipe(catchError(this.handleError));
    }
    GetStudentByClass(selectedClass: string): Observable<Student[]> {
        return this._httpClient.get<Student[]>(`${this.appUrl}GetStudentByClass/${selectedClass}`)
        .pipe(catchError(this.handleError));
    }
    AddStudent(student: Student) {
        return this._httpClient.post(`${this.appUrl}AddStudent`, student, this.httpOptions).pipe(catchError(this.handleError));
    }
    UpdateStudent(studentId: number, student: Student) {
        return this._httpClient.put(`${this.appUrl}EditStudent/${studentId}`, student , this.httpOptions)
        .pipe(catchError(this.handleError));
    }
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          console.error('Client side error : ', error.error.message);
        } else {
            console.log('Server side error : ', error.error);
        }
        return throwError('Something bad happened; please try again later.');
        }
}

