import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

export class Result {
  constructor(public name: string) { }
}

@Injectable()
export class SearchService {
  constructor(private http: HttpClient) { }

  search(query: string) {
    return this.http.get('http://localhost:5000/search/', {
      params: new HttpParams().set('q', query)
    });
  }
}
