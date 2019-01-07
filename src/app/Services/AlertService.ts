import { Injectable } from '@angular/core';
import {ToastyService, ToastyConfig} from 'ng2-toasty';
@Injectable()
export class AlertService {
    constructor(private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
        // Assign the selected theme name to the `theme` property of the instance of ToastyConfig.
        // Possible values: default, bootstrap, material
        this.toastyConfig.theme = 'bootstrap';
        this.toastyConfig.position = 'top-right';
    }
    Default(title: any, message?: any) {
        this.toastyService.default({
            title: title,
            msg: message,
            showClose: true,
            timeout: 50000,
            theme: 'bootstrap'
        });
    }
    Success(title: any, message?: any) {
        this.toastyService.success({
            title: title,
            msg: message,
            showClose: true,
            timeout: 50000,
            theme: 'bootstrap'
        });
    }
    Error(title: any, message?: any) {
        this.toastyService.error({
            title: title,
            msg: message,
            showClose: true,
            timeout: 50000,
            theme: 'bootstrap'
        });
    }
    Warning(title: any, message?: any) {
        this.toastyService.warning({
            title: title,
            msg: message,
            showClose: true,
            timeout: 50000,
            theme: 'bootstrap'
        });
    }
    Info(title: any, message?: any) {
        this.toastyService.info({
            title: title,
            msg: message,
            showClose: true,
            timeout: 50000,
            theme: 'bootstrap'
        });
    }
    StartLoading(title: any, message?: any) {
        this.toastyService.wait({
            title: title,
            msg: message,
            showClose: true,
            timeout: 500000,
            theme: 'bootstrap'
        });
    }
    StopLoadingMessage() {
        this.toastyService.clearAll();
    }

}

