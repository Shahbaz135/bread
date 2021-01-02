import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const toggler = document.querySelector('.navbar > .toggler'),
      navListContainer = document.querySelector('.navbar > .nav-list-container');

    /*when toggler button is clicked*/
    toggler.addEventListener(
      "click",
      () => {
        //convert hamburger to close
        toggler.classList.toggle('cross');
        //make nav visible
        navListContainer.classList.toggle('nav-active');
      },
      true
    );

  }

}
