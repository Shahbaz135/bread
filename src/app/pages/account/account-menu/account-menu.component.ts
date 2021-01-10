import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.css']
})
export class AccountMenuComponent implements OnInit {
  
  constructor() { }

  showMyContainer: boolean = false;


  ngOnInit(): void {

    var header = document.getElementById("menu-ul");
    var linkes = header.getElementsByClassName("links");
    for (var i = 0; i < linkes.length; i++) {
      linkes[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("actives");
      current[0].className = current[0].className.replace(" actives", "");
      this.className += " actives";
      });
    }

   
    
    // function myFunction(x) {
    //   if (x.matches) { // If media query matches
    //     document.getElementById("acnt-menu").style.display="none";
        
        
    //   } else {
    //     document.getElementById("acnt-menu").style.display="block";
    //   }
    // }
    
    // var x = window.matchMedia("(max-width: 768px)")
    // myFunction(x) // Call listener function at run time
    // x.addListener(myFunction) // Attach listener function on state changes
    
  }

  
  

}
