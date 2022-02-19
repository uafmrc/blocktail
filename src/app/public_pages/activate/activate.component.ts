import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpUrlService } from 'src/app/service/http/http-url.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  guid:any;
  tempcode:any;
  activated:boolean;
  loading:boolean;

  constructor(public route: ActivatedRoute, public http:HttpClient, public url: HttpUrlService) {
    this.guid = this.route.snapshot.paramMap.get('string');
    this.tempcode = this.route.snapshot.paramMap.get('stringtwo');
    this.Activate();
  }

  ngOnInit(): void {
  }

  async Activate() {
    this.loading = true;
    this.http.post<any>(this.url.httpUrl() + "/server/api/user/user-api.php", JSON.stringify({
        "request": "activate",
        "string": this.guid,
        "stringtwo": this.tempcode
      })).subscribe(res => {
        if(res.result != "201") {
          this.activated = false;
          this.loading = false;
        } else {
          this.loading = false;
          window.location.replace('');
        }
      });
  }

}
