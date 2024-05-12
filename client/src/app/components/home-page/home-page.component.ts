import { Component, ElementRef, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  isUserLoggedIn:boolean = false;

  @ViewChild('menuBars') menuBars!: ElementRef;
  @ViewChild('navbar') navbar!: ElementRef;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.isUserLoggedIn = this.authService.isAuthenticated();

    // this.menuBars.nativeElement.onclick = () => {
    //   this.menuBars.nativeElement.classList.toggle('fa-times');
    //   this.navbar.nativeElement.classList.toggle('active');
    // }

    // window.onscroll = () => {
    //   this.menuBars.nativeElement.classList.remove('fa-times');
    //   this.navbar.nativeElement.classList.remove('active');
    // }

    var homeSwiper = new Swiper(".home-slider", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: true,
      },
      pagination: {
          el: ".swiper-pagination",
      },
      loop:true,
      autoplay:{
          delay:3000,
          disableOnInteraction:false,
      }
  });

  var reviewSwiper = new Swiper(".review-slider", {
    slidesPerView:1,
            grabCursor:true,
            spaceBetween:10,
            loop:true,
            breakpoints:{
                0:{
                    slidesPerView:1,
                },
                700:{
                    slidesPerView:2,
                },
                1050:{
                    slidesPerView:3,
                },
            },
            autoplay:{
                delay:5000,
                disableOnInteraction:false,
            }
});
  }


}
