import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SearchService } from './search.service';
import { SearchResult } from './search-result';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {
  businessResults = [];
  peopleResults = [];
  queryString: string = '';

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      let q = params.get('q');
      if (q !== null) {
        this.queryString = q;
        this.search();
      }
    })
  }

  search () {
    this.searchService.search(this.queryString).subscribe((data) => {
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
