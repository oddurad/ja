import { Component } from '@angular/core';
import { SearchService } from './search.service';

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
      console.log(data)
      this.peopleResults = data['people']['items'] || [];
      this.businessResults = data['businesses']['items'] || [];
    });
  }
}
