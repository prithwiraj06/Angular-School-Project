import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { Student } from 'src/Models/student.model';
import { StudentService } from 'src/app/Services/students.service';
import { AlertService } from 'src/app/Services/AlertService';
@Component({
    selector: 'app-addedit-student',
    templateUrl: './addEditStudent.component.html',
    styleUrls: ['./addEditStudent.component.css']
})
export class AddEditStudentComponent implements OnInit {
    @Input()
    purpose: string;
    @Input()
    selectedStudentId: number;
    @Output() closeStudentModal = new EventEmitter();
    modalHeader: string = null;
    student: Student = {
        EnrollmentNumber: null,
        Name : null,
        FatherName : null,
        MotherName : null,
        Gender : null,
        DateOfBirth : null,
        Class : null,
        Address : null,
        ContactNumber : null,
        Status : true,
        AddmissionDate : null
    };
    saveClicked: boolean = null;
    disableSaveButton: boolean = null;
    constructor(private _studentService: StudentService, private _alertService: AlertService) {}

    ngOnInit() {
        this.saveClicked = false;
        this.disableSaveButton = false;
        if (this.purpose === 'add') {
            this.modalHeader = 'Add Student';
        }
        // tslint:disable-next-line:one-line
        else {
            this.modalHeader = 'Edit Student';
            this._alertService.StartLoading('Loading student details');
            this._studentService.GetStudentByEnrollmentNumber(this.selectedStudentId)
            .subscribe(data => {
                if (data) {
                    this.student = data;
                    this._alertService.StopLoadingMessage();
                    // converting the date into string
                    this.student.DateOfBirth = new Date(data.DateOfBirth).toLocaleDateString();
                    this.student.AddmissionDate = new Date(data.AddmissionDate).toLocaleDateString();
                } else {
                    this._alertService.StopLoadingMessage();
                    this._alertService.Error('Unable to fetch the student details');
                }
            }, (error) => {
                this._alertService.StopLoadingMessage();
                this._alertService.Error('Failed to load student data', 'Server is busy please try again later');
            });
        }
    }

    saveStudent() {
        this.saveClicked = true;
        this.disableSaveButton = true;
        if (this.purpose === 'add') {
            this._studentService.AddStudent(this.student).subscribe(data => {
                if (data) {
                    this.saveClicked = false;
                    this._alertService.Success('Student Added Succesfully');
                    this.closeAddEditStudentModal('closeModal');
                } else {
                    this.saveClicked = false;
                    this._alertService.Error('Failed', 'Unable to add student please try again later');
                    this.closeAddEditStudentModal('closeModal');
                }
            }, (error) => {
                this.saveClicked = false;
                this._alertService.StopLoadingMessage();
                this._alertService.Error('Failed to add student ', 'Unable to add student please try again later');
            });
        }
        if (this.purpose === 'edit') {
            this._studentService.UpdateStudent(this.selectedStudentId, this.student).subscribe(data => {
                if (data) {
                    this.saveClicked = false;
                    this._alertService.Success('Student Updated Succesfully');
                    this.closeAddEditStudentModal('closeModal');
                } else {
                    this.saveClicked = false;
                    this._alertService.Error('Failed to update student', 'Unable to update student details please try again later');
                    this.closeAddEditStudentModal('closeModal');
                }
            }, (error) => {
                this.saveClicked = false;
                this._alertService.StopLoadingMessage();
                this._alertService.Error('Failed to update the student', 'Unable to update student details please try again later');
            });
        }
    }

    closeAddEditStudentModal(value: string) {
        if (value != null) {
            this.closeStudentModal.emit(value);
        } else {
            this.closeStudentModal.emit(null);
        }
    }
}
