import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/common/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isLogged: boolean;

  constructor(
    private router: Router
  ) {
    /// detects whenever route changes
    router.events.forEach(event => {
      if (event instanceof NavigationEnd) {
        this.removeClass();
      }
    });
  }

  ngOnInit(): void {
    this.isLogged = AuthService.isLogged();
  }

  toggleClasses(): void {
    const navListContainer = document.querySelector('.navbar > .nav-list-container');
    const toggler = document.querySelector('.navbar > .toggler');

    // convert hamburger to close
    toggler.classList.toggle('cross');
     // make nav visible
    navListContainer.classList.toggle('nav-active');
  }

  removeClass(): void {
    const navListContainer = document.querySelector('.navbar > .nav-list-container');
    const toggler = document.querySelector('.navbar > .toggler');

    toggler.classList.remove('cross');
    navListContainer.classList.remove('nav-active');
  }

  LogOut(): void {
    this.isLogged = false;
    AuthService.removeLoggedUser();
    this.router.navigateByUrl(`auth/login`);
  }

}
