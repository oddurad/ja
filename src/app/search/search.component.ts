import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
  businessResultsCount: number; // the total number of business results available from the API
  lastBusinessItem: number; // the index of the last business result fetched from the API
  peopleResults = [];
  peopleResultsCount: number;
  lastPersonItem: number;
  queryString: string = '';
  lastQueryString: string = ''; // the last query that was performed (for error message)

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      // get the 'q' query parameter from the router on page load
      let q = params.get('q');
      if (q !== null) {
        this.queryString = q;
        this.search();
      }
    })
  }

  search() {
    if (this.queryString == undefined || this.queryString === '') {
      return;
    }

    this.searchService.search(this.queryString).subscribe((data) => {
      this.router.navigate(['/search', { q: this.queryString }]); // add the q parameter to the URL
      this.lastQueryString = this.queryString;
      this.businessResults = [];
      this.businessResultsCount = 0;
      this.lastBusinessItem = 0;
      this.peopleResults = [];
      this.peopleResultsCount = 0;
      this.lastPersonItem = 0;

      data['businesses']['items'].forEach((business) => {
        this.businessResults.push(new SearchResult(business));
      });
      this.businessResultsCount = data['businesses']['meta']['total_items'];
      this.lastBusinessItem = data['businesses']['meta']['last_item'];
      data['people']['items'].forEach((person) => {
        this.peopleResults.push(new SearchResult(person));
      });
      this.peopleResultsCount = data['people']['meta']['total_items'];
      this.lastPersonItem = data['people']['meta']['last_item'];
    });
  }

  getMoreResults(type: string) {
    let resultsToFetch: number = 10; // the number of additional results to fetch
    var nextItem: number;

    if (type === 'businesses') {
      var nextItem = this.lastBusinessItem + 1;
    } else if (type === 'people') {
      var nextItem = this.lastPersonItem + 1;
    } else {
      return;
    }

    this.searchService.search(this.queryString, nextItem, resultsToFetch, type).subscribe((data) => {
      if (type === 'businesses') {
        data['items'].forEach((business) => {
          this.businessResults.push(new SearchResult(business));
        });
        this.lastBusinessItem = data['meta']['last_item'];
      } else if (type === 'people') {
        data['items'].forEach((person) => {
          this.peopleResults.push(new SearchResult(person));
        });
        this.lastPersonItem = data['meta']['last_item'];
      }
    });
  }
}
