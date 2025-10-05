import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprehensiveDataService {
  private baseUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  populateAllTablesFromSignups(): Observable<any> {
    return this.http.post(`${this.baseUrl}/populate-all-tables`, {});
  }

  getDataStatus(): Observable<any> {
    return this.http.get(`${this.baseUrl}/data-status`);
  }
}
