import { Injectable } from "@angular/core";
import { Http } from "@angular/http";


@Injectable()
export class AppService {

    constructor(private http: Http) { }
    public sendImage(file) {
        let formData: FormData = new FormData();
        formData.append('image', file);
        return this.http.post('https://iseeyouapi.azurewebsites.net/api/products', formData);
    }
}