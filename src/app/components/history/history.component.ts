import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AudioScribeService } from 'src/app/services/audio-scribe.service';
import { USERID } from 'src/app/services/constants';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  data: any = [];
  loader: boolean = false;

  constructor(
    private router: Router,
    private http: HttpService,
    private location: Location
  ) {}

  ngOnInit() {
    this.loader = true;
    const userid = USERID;
    this.http
      .getUserScribe({ userid })
      .toPromise()
      .then((data: any) => {
        this.data = data;
        this.loader = false;
      })
      .catch((error: any) => {
        this.loader = false;
        console.log('error', error);
      });
  }

  navigateBack() {
    this.location.back();
  }

  viewScribe(data: any) {
    localStorage.setItem('scribeInfo', JSON.stringify(data));
    this.router.navigateByUrl('scribe-info');
  }
}
