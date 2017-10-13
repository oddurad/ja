import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SearchService } from '../search/search.service';
import { SearchResult } from '../search/search-result';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './details.component.html',
  styles: []
})
export class DetailsComponent implements OnInit {
  public result: Observable<SearchResult>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    // get the 'id' parameter from the URL and fetch the appropriate result
    this.result = this.route.paramMap.switchMap((params: ParamMap) => {
      return this.searchService.fetchById(params.get('id'));
    });
  }
}
