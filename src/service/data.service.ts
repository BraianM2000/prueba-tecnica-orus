import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private apiUrl = 'https://62ec1a2d818ab252b6f809d5.mockapi.io/api/Stations/'


    private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(Object);
    private selectedMarkersDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(Object);

    getContent(): Observable<any> {
        return this.dataSubject.asObservable();
    }

    setContent(data: any) {
        this.dataSubject.next(data);
    }
    getSelectedMarkers(): Observable<any> {
        return this.selectedMarkersDataSubject.asObservable();
    }

    setSelectedMarkers(data: any) {
        this.selectedMarkersDataSubject.next(data);
    }

    getValidators() {
        return this.http.get(this.apiUrl);
    }

    getValidator(id: string) {
        const url = `${this.apiUrl}/${id}`
        return this.http.get(url)
    }

    updateValidator(id: string, data: any) {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put(url, data);
    }

    deleteValidator(id: string) {
        const url = `${this.apiUrl}/${id}`
        return this.http.delete(url);
    }
    addValidator(newData: any) {
        return this.http.post(this.apiUrl, newData)
    }

    constructor(private http: HttpClient) { }
}