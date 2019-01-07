import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import { StudentService } from 'src/app/Services/students.service';
import { Student } from 'src/Models/student.model';
import { AlertService } from 'src/app/Services/AlertService';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
@Component({
    templateUrl: './getStudents.component.html',
    styleUrls: ['./getStudents.component.css']
})
export class GetStudentsComponent implements OnInit {
    // bs modal
    StudentModalRef: BsModalRef;
    @ViewChild('addEditStudentModal')
    addEditStudentModal: TemplateRef<any>;
    modalConfig = {
        backdrop: true,
        ignoreBackdropClick: true,
        animated: true,
        class: 'modal-lg'
      };
    // ngx-datatable template refrence anchor
    @ViewChild('studentNameTemplate')
    studentNameTemplate: string;
    @ViewChild('studentStatusTemplate')
    studentStatusTemplate: boolean;

    modalTitle: string = null;
    purpose: string = null;

    selectedClass: string = null;
    selectedStudentId: number = null;
    studentsAllData: Student[] = [];
    studentData: Student[] = [];
    gridColumnName: any[] = [];
    loadingIndicator: boolean = null;
    selectedClassControl: number = null;

    searchTerm: string = null;
    constructor(private _studentService: StudentService, private _alertService: AlertService, private modalService: BsModalService) {
    }
    ngOnInit() {
        this._alertService.StartLoading('Loading students');
        this.gridColumnName = [
            { prop: 'EnrollmentNumber', name: 'Enroll. Number', width: 100, resizeable: false, draggable: false},
            { prop: 'Name', name: 'Student Name', cellTemplate: this.studentNameTemplate, width: 250, resizeable: false, draggable: false},
            { prop: 'FatherName', name: 'Fathers Name', width: 250, resizeable: false, draggable: false },
            { prop: 'Class', name: 'Class', width: 50, resizeable: false, draggable: false},
            { prop: 'ContactNumber', name: 'Contact Number', width: 110, resizeable: false, draggable: false },
            { prop: 'Status', name: 'Status', cellTemplate: this.studentStatusTemplate, width: 100, resizeable: false, draggable: false}
        ];
        this._studentService.GetAllStudents().subscribe(data => {
            this.loadingIndicator = true;
            if (data) {
                this.loadingIndicator = true;
                this._alertService.StopLoadingMessage();
                this.studentsAllData = data;
                this.studentData = data;
                this.loadingIndicator = false;
            } else {
                this._alertService.StopLoadingMessage();
                this.loadingIndicator = false;
                this._alertService.Error('Failed to load data', 'Server is busy please try again later');
            }
        }, (error) => {
            this.loadingIndicator = false;
            this._alertService.StopLoadingMessage();
            this._alertService.Error('Failed to load student data', 'Server is busy please try again later');
        });
    }
    editStudent(selectedStudent: Student) {
        this.purpose = 'edit';
        this.selectedStudentId = selectedStudent.EnrollmentNumber;
        this.StudentModalRef = this.modalService.show(this.addEditStudentModal, Object.assign({}, this.modalConfig));

        }
    ddlSelectedClassChanged(selectedClass: string) {
        if (selectedClass != null) {
            this.loadingIndicator = true;
            this._alertService.StartLoading('Loading students of class ' + selectedClass);
            this._studentService.GetStudentByClass(selectedClass).subscribe(data => {
                if (data) {
                    this.loadingIndicator = false;
                    this._alertService.StopLoadingMessage();
                    this.studentsAllData = data;
                    this.studentData = data;
                } else {
                    this.loadingIndicator = false;
                    this._alertService.StopLoadingMessage();
                    this._alertService.Error('Failed to load data ', 'Please try again later');
                }
            });
        }
    }
    openStudentModal() {
        this.purpose = 'add';
        this.selectedStudentId = null;
        this.StudentModalRef = this.modalService.show(this.addEditStudentModal, Object.assign({}, this.modalConfig));
    }
    closeAddEditStudentModal(value: string) {
        if (value != null) {
            this.updateGrid();
            this.StudentModalRef.hide();
        } else {
            this.StudentModalRef.hide();
        }
    }
    updateGrid() {
        this.loadingIndicator = true;
        this._alertService.StartLoading('Loading students');
        this._studentService.GetAllStudents().subscribe(data => {
            if (data) {
                this._alertService.StopLoadingMessage();
                this.loadingIndicator = false;
                this.studentsAllData = data;
                this.studentData = data;
            } else {
                this._alertService.StopLoadingMessage();
                this.loadingIndicator = false;
                this._alertService.Error('Failed to load data', 'Server is busy please try again later');
            }
        }, (error) => {
            this.loadingIndicator = false;
            this._alertService.StopLoadingMessage();
            this._alertService.Error('Failed to load student data', 'Server is busy please try again later');
        });
    }

    searchBySearchTerm() {
        if (this.searchTerm.trim() === '' || this.searchTerm.trim() == null) {
            this.studentData = this.studentsAllData;

        } else {
            this.studentData = this.studentsAllData.filter(x => x.Name.toLowerCase().indexOf(this.searchTerm.trim().toLowerCase()) !== -1);
            console.log(this.studentData);
        }
    }
}

