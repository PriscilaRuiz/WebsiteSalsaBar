import { Component, HostListener} from '@angular/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  toolbarfixed:boolean = false;
  @HostListener('window:scroll',['$event']) onscroll(){
    if(window.scrollY > 150){
      this.toolbarfixed = true;
    }else{
      this.toolbarfixed = false;
    }
  }
}
