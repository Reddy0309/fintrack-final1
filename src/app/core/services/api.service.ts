import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5154'; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  // Generic method to fetch data from any endpoint
  getData(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}`);
  }

  // Fetch investments for a specific user
  getInvestments(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/investments?userId=${userId}`);
  }

  // Fetch transactions for a specific user
  getTransactions(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/transactions?userId=${userId}`);
  }

  // Search for stocks using the StockSearch API
  searchStocks(query: string): Observable<any> {
    const params = new HttpParams().set('query', query);
    return this.http.get(`${this.baseUrl}/api/StockSearch/search`, { params });
  }
}