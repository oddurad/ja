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

  search(query: string, start?: number, count?: number, scope?: string) {
    return this.http.get('https://api.ja.is/search/v6/', {
      params: new HttpParams()
      .set('q', query)
      .set('access_code', '<YOUR_API_KEY>')
      .set('start', start ? start.toString() : '1')
      .set('count', count ? count.toString() : '10')
      .set('scope', scope || 'fast')
    });
  }

  fetchById(nationalIdNumber: string) {
    // fetch a single result using the /search API
    return this.search(nationalIdNumber).map((results) => {
      // TODO: nationalIdNumber (kennitala) is not a truly unique identifier, this needs to be handled differently
      let businessResult = results['businesses']['items'].find(result => result.national_id_number == nationalIdNumber);
      let personResult = results['people']['items'].find(result => result.national_id_number == nationalIdNumber);
      return new SearchResult(businessResult || personResult);
    });
  }
}
