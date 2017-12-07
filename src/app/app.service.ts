import { Http } from '@angular/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { LoadingController, Loading, ToastController } from "ionic-angular";
import { Camera } from '@ionic-native/camera';
import { HTTP } from '@ionic-native/http';

@Injectable()
export class AppService {

    constructor(private http: HTTP) { }
    public sendImage(file) {
        let headers = new Headers({ 'Content-Type': 'application/json' });

        let formData: FormData = new FormData();
        formData.append('image', file);
        return this.http.post('https://iseeyouapi.azurewebsites.net/api/products', formData, headers);
    }

    postData(formData: FormData) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('https://iseeyouapi.azurewebsites.net/api/products', formData, { headers: headers });
    }
}