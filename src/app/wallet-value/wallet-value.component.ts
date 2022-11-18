import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { interval, merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-wallet-value',
  templateUrl: './wallet-value.component.html',
  styleUrls: ['./wallet-value.component.scss'],
})
export class WalletValueComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'rank',
    'name',
    'symbol',
    'usd_price',
    'quantity',
    'value',
  ];
  exampleDatabase: ExampleHttpDatabase | null;
  data: GithubIssue[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _httpClient: HttpClient) {}

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    // x number of seconds
    const interval$ = interval(2000).pipe(
      // make first request right away; otherwise we have to wait x seconds before first one
      startWith(),

      // cancel previous request if it had not finished yet
      switchMap(() =>
        // catch the error inside to allow for a retry each time
        // you could also use `.catch` on the entire observable stream which will
        // cancel it if there's an error.
        this.exampleDatabase!.getRepoIssues()
      )
    );

    interval$.subscribe((data) => (this.data = data.data));
  }

  /** Gets the total cost of all transactions. */
  getTotalValue() {
    return this.data
      .map((t) => t.usd_price * 5)
      .reduce((acc, value) => acc + value, 0);
  }
}

export interface GithubApi {
  data: GithubIssue[];
  total: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
  usd_price: number;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `https://price-api.crypto.com/price/v1/tokens?page=1&limit=8`;

    return this._httpClient.get<GithubApi>(requestUrl);
  }
}
