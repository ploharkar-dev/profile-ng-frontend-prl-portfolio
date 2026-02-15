import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  activeSection: string = 'home';
  menuOpen: boolean = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.detectActiveSection();
    }
  }

  @HostListener('window:scroll', [])
  onScroll() {
    if (this.isBrowser) {
      this.detectActiveSection();
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  setActive(section: string) {
    this.activeSection = section;
  }

  detectActiveSection() {
    const sections = ['introduction', 'experience', 'projects', 'education', 'awards', 'contact'];
    const sectionNames = ['home', 'experience', 'projects', 'education', 'awards', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach((section, index) => {
      const element = document.querySelector(`#${section}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          this.activeSection = sectionNames[index];
          navLinks.forEach(link => link.classList.remove('active'));
          const activeLink = document.querySelector(`a[href="#${sectionNames[index]}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      }
    });
  }
}
