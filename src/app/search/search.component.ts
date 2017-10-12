import { Component } from '@angular/core';
import { SearchService } from './search.service';
import { SearchResult } from './search-result';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent {
  constructor(private searchService: SearchService) {}
  peopleResults = [];
  businessResults = [];

  search (queryString: string) {
    this.searchService.search(queryString).subscribe((data) => {
      this.peopleResults = [];
      this.businessResults = [];

      data['businesses']['items'].forEach((business) => {
        this.businessResults.push(new SearchResult(business));
      });
      data['people']['items'].forEach((person) => {
        this.peopleResults.push(new SearchResult(person));
      });
    });
  }
}
