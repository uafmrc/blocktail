import { Component, OnInit } from '@angular/core';
import { SplashService } from 'src/app/service/splash/splash.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  // The screen starts with the maximum opacity
  public opacityChange = 1;
  public splashTransition:any;
  // First access the splash is visible
  public showSplash = true;
  readonly ANIMATION_DURATION = 1;

  constructor(private splashScreenStateService: SplashService) { }

  ngOnInit(): void {
    // Somewhere the stop method has been invoked
   this.splashScreenStateService.subscribe((res:any) => {
      this.hideSplashAnimation();
    });
  }

  private hideSplashAnimation() {
    // Setting the transition
    this.splashTransition = `opacity ${this.ANIMATION_DURATION}s`;
    this.opacityChange = 0;
    setTimeout(() => {
       // After the transition is ended the showSplash will be hided
       this.showSplash = !this.showSplash;
    }, 1000);
  }

}
