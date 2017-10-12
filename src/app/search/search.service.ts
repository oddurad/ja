import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { SearchResult } from './search-result';

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

  fetchById(nationalIdNumber: string) {
    return this.search(nationalIdNumber).map((results) => {
      let businessResult = results['businesses']['items'].find(result => result.national_id_number == nationalIdNumber);
      let personResult = results['people']['items'].find(result => result.national_id_number == nationalIdNumber);
      return new SearchResult(businessResult || personResult);
    });
  }
}
