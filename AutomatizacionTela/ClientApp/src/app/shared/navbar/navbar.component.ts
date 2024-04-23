import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

 /*  @ViewChild('sidebar', { static: true }) sidebar: ElementRef | undefined;

  darkMode = false; // Controlar el estado del modo oscuro

  toggleSidebar(): void {
    this.sidebar?.nativeElement.classList.toggle('Rollo');
  }

  removeCloseFromSidebar(): void {
    this.sidebar?.nativeElement.classList.toggle('close');
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
 */
  isVisible: boolean = false;
  constructor(private elementRef: ElementRef,private renderer: Renderer2) { }

  // Evento que nos ayuda a expandir y contraer el sidebar (cuando está en modo móvil)
  toggle() {

    let sidebar = this.elementRef.nativeElement.querySelector(".sidebar");
    let closeBtn = this.elementRef.nativeElement.querySelector("#btn");
  
    sidebar.classList.toggle("open");
  
    if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
    this.isVisible = !this.isVisible;
  }

 

  logout() {
    localStorage.clear()
    window.location.href = "https://miclocal.com.co:9321/login";
  }
}
