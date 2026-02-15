import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  activeSection: string = 'home';

  ngOnInit() {
    this.detectActiveSection();
    window.addEventListener('scroll', () => this.detectActiveSection());
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
