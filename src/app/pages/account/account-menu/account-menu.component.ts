import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.css']
})
export class AccountMenuComponent implements OnInit {

  constructor(
    private router: Router
  ) {
    router.events.forEach(event => {
      if (event instanceof NavigationEnd) {
        // this.showMyContainer = false;
        // this.addClass();
      }
    });
  }

  showMyContainer = false;

  ngOnInit(): void {
    const header = document.getElementById("menu-ul");
    const linkes = header.getElementsByClassName("links");

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < linkes.length; i++) {
      linkes[i].addEventListener("click", function() {
        const current = document.getElementsByClassName("actives");
        current[0].className = current[0].className.replace(" actives", "");
        this.className += "actives";
      });
    }

    const sidemenu = document.getElementById("menu-ul-m");
    console.log(`side menu ==`, sidemenu);
    const linker = sidemenu.getElementsByClassName("link2");

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < linker.length; i++) {
      linker[i].addEventListener("click", function() {
        console.log(`linked is clicked --`);
        const current = document.getElementsByClassName("activate");
        current[0].className = current[0].className.replace(" activate", "");
        this.className += " activate";
      });
    }
  }

  addClass(): void {
    // const header = document.getElementById("menu-ul");
    // const linkes = header.getElementsByClassName("links");

    // // tslint:disable-next-line: prefer-for-of
    // for (let i = 0; i < linkes.length; i++) {
    //   linkes[i].addEventListener("click", function() {
    //   var current = document.getElementsByClassName("actives");
    //   current[0].className = current[0].className.replace(" actives", "");
    //   this.className += " actives";
    //   });
    // }

    const sidemenu = document.getElementById("menu-ul-m");
    const linker = sidemenu.getElementsByClassName("link2");

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < linker.length; i++) {
      linker[i].addEventListener("click", function() {
      const current = document.getElementsByClassName("activate");
      current[0].className = current[0].className.replace(" activate", "");
      this.className += " activate";
      });
    }
  }
}
