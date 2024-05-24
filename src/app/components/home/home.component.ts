import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USERID } from 'src/app/services/constants';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loader: boolean = false;
  data = [];
  constructor(private router: Router, private http: HttpService) {}

  ngOnInit() {
    this.loader = true;
    const userid = USERID;
    this.http
      .getUserScribe({ userid })
      .toPromise()
      .then((data: any) => {
        data.length = 2;
        this.data = data;
        this.loader = false;
      })
      .catch((error: any) => {
        this.loader = false;
        console.log('error', error);
      });
  }

  goToRecordNotes() {
    this.router.navigateByUrl('record');
  }

  goToHistory() {
    this.router.navigateByUrl('history');
  }

  viewScribe(data: any) {
    localStorage.setItem('scribeInfo', JSON.stringify(data));
    this.router.navigateByUrl('scribe-info');
  }

  logout() {
    this.router.navigateByUrl('login');
}
 toggleDropdown() {
  var dropdownContent = document.getElementById("dropdownContent");
  if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
  } else {
      dropdownContent.style.display = "block";
  }
}
}
