import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  imports: [HttpClientModule, CommonModule],
  providers: [HttpClient],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent  implements OnInit {
  trains: any[] = [];
  filtershow = false;
  classFilters = [
    { id: '1a', name: '1st Class AC - 1A', count: 39 },
    { id: '2a', name: '2nd Class AC - 2A', count: 47 },
    { id: '3a', name: '3rd Class AC - 3A', count: 50 },
    { id: 'sl', name: 'Sleeper - SL', count: 42 },
  ];

  train = [
    {
      name: 'Ndls Cnb Sht',
      number: 12034,
      days: 'SMTWTFS',
      departureTime: '3:50 PM',
      departureDate: '11 Dec',
      departureStation: 'New Delhi',
      arrivalTime: '8:50 PM',
      arrivalDate: '11 Dec',
      arrivalStation: 'Kanpur Central',
      duration: '5h 0m',
      fares: [
        { class: 'CC', available: 58, price: 1115, updated: '4 hrs ago' },
        { class: 'EC', available: 5, price: 2080, updated: '11 hrs ago' },
      ],
    },
    {
      name: 'Purushottam Exp',
      number: 12802,
      days: 'SMTWTFS',
      departureTime: '10:40 PM',
      departureDate: '11 Dec',
      departureStation: 'New Delhi',
      arrivalTime: '4:00 AM',
      arrivalDate: '12 Dec',
      arrivalStation: 'Kanpur Central',
      duration: '5h 20m',
      fares: [
        { class: '3A', available: 110, price: 1150, updated: '10 hrs ago' },
        { class: '2A', available: 32, price: 1590, updated: '6 hrs ago' },
      ],
    },
  ];
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const { from, to, travelDate, classType } = params;
      this.http.get<any[]>('/assets/trains.json').subscribe((data) => {
        this.trains = data.filter(
          (train) =>
            train.from === from &&
            train.to === to &&
            (classType === 'All' || train.class === classType)
        );
      });
    });
  }

}
