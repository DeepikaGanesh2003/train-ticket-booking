import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  imports: [FormsModule,HttpClientModule,CommonModule],
  providers: [HttpClient],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent{
  from: string = '';
  to: string = '';
  travelDate: string = '';
  locations: string[] = [];
  filteredFromLocations: string[] = [];
  filteredToLocations: string[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<string[]>('/assets/location.json').subscribe((data) => {
      this.locations = data;
    });
  }

  filterLocations(type: string) {
    const query = type === 'from' ? this.from : this.to;
    const filtered = this.locations.filter((location) =>
      location.toLowerCase().includes(query.toLowerCase())
    );

    if (type === 'from') {
      this.filteredFromLocations = filtered;
    } else {
      this.filteredToLocations = filtered;
    }
  }

  search() {
    this.router.navigate(['/results'], {
      queryParams: { from: this.from, to: this.to, date: this.travelDate },
    });
  }
}
