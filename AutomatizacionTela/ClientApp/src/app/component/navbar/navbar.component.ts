import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @ViewChild('sidebar', { static: true }) sidebar: ElementRef | undefined;

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
}
