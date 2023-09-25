import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private apiUrl = 'https://62ec1a2d818ab252b6f809d5.mockapi.io/api/Stations/'

    getValidators() {
        return this.http.get(this.apiUrl);
    }

    getValidator(id:string){
        const url = `${this.apiUrl}/${id}`
        return this.http.get(url)
    }

    updateValidator(id: string, data: any){
        const url = `${this.apiUrl}/${id}`;
        return this.http.put(url, data);
    }

    deleteValidator(id: string){
        const url = `${this.apiUrl}/${id}`
        return this.http.delete(url);
    }
    addValidator(newData: any){
        return this.http.post(this.apiUrl,newData)
    }

    constructor(private http: HttpClient) { }
}