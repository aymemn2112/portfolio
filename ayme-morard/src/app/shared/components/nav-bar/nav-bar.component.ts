import { Component, inject, signal, HostListener } from '@angular/core';
import { CvService } from '../../../core/services/cv.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  template: `
    <nav class="nav-bar" [class.scrolled]="scrolled()" [class.mobile-open]="mobileOpen()">
      <div class="nav-container">
        <a class="nav-logo" (click)="scrollTo('hero')">
          <span class="logo-text">AM</span>
        </a>

        <button class="mobile-toggle button-icon" (click)="toggleMobile()" aria-label="Toggle menu">
          <span class="hamburger" [class.open]="mobileOpen()">
            <span></span><span></span><span></span>
          </span>
        </button>

        <div class="nav-links" [class.show]="mobileOpen()">
          @for (id of sectionIds(); track id) {
            <a
              class="nav-link"
              [class.active]="activeSection() === id"
              (click)="scrollTo(id)"
            >
              {{ getLabel(id) }}
            </a>
          }
          <button class="theme-toggle button-icon" (click)="toggleTheme()" [attr.aria-label]="'Switch to ' + (theme() === 'dark' ? 'light' : 'dark') + ' mode'">
            @if (theme() === 'dark') {
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            } @else {
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            }
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .nav-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      padding: 1rem 0;
      transition: all 0.3s ease;
    }

    .nav-bar.scrolled {
      background: var(--nav-bg);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--glass-border);
      padding: 0.5rem 0;
    }

    .nav-container {
      max-width: var(--max-width);
      margin: 0 auto;
      padding: 0 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .nav-logo {
      cursor: pointer;
    }

    .logo-text {
      font-size: 1.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, var(--primary-light), var(--secondary-light));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .nav-link {
      padding: 0.4rem 0.8rem;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
    }

    .nav-link:hover {
      color: var(--text-primary);
      background: var(--glass-bg);
    }

    .nav-link.active {
      color: var(--primary-light);
      background: rgba(124, 58, 237, 0.1);
    }

    .mobile-toggle {
      display: none;
      z-index: 1001;
    }

    .hamburger {
      width: 18px;
      height: 14px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .hamburger span {
      display: block;
      height: 2px;
      width: 100%;
      background: var(--text-primary);
      border-radius: 2px;
      transition: all 0.3s ease;
    }

    .hamburger.open span:nth-child(1) {
      transform: translateY(6px) rotate(45deg);
    }

    .hamburger.open span:nth-child(2) {
      opacity: 0;
    }

    .hamburger.open span:nth-child(3) {
      transform: translateY(-6px) rotate(-45deg);
    }

    .theme-toggle {
      margin-left: 0.5rem;
    }

    @media (max-width: 768px) {
      .mobile-toggle {
        display: flex;
      }

      .nav-links {
        position: fixed;
        top: 0;
        right: -100%;
        width: 70%;
        max-width: 300px;
        height: 100vh;
        flex-direction: column;
        justify-content: center;
        gap: 0.5rem;
        background: var(--nav-bg);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-left: 1px solid var(--glass-border);
        transition: right 0.3s ease;
        padding: 2rem;
      }

      .nav-links.show {
        right: 0;
      }

      .nav-link {
        font-size: 1.1rem;
        padding: 0.75rem 1rem;
        width: 100%;
        text-align: center;
      }

      .theme-toggle {
        margin-top: 1rem;
        margin-left: 0;
      }
    }
  `]
})
export class NavBarComponent {
  private cvService = inject(CvService);
  private themeService = inject(ThemeService);

  scrolled = signal(false);
  mobileOpen = signal(false);

  sectionIds = this.cvService.sectionIds;
  activeSection = this.cvService.activeSection;
  theme = this.themeService.theme;

  private sectionLabels: Record<string, string> = {
    hero: 'Accueil',
    about: 'À propos',
    experience: 'Expérience',
    projects: 'Le Meilleur',
    skills: 'Compétences',
    education: 'Formation',
    languages: 'Langues',
    hobbies: 'Loisirs'
  };

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 50);
    this.updateActiveSection();
  }

  private updateActiveSection(): void {
    const sections = this.sectionIds();
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200) {
          this.cvService.setActiveSection(sections[i]);
          break;
        }
      }
    }
  }

  getLabel(id: string): string {
    return this.sectionLabels[id] || id;
  }

  scrollTo(id: string): void {
    this.mobileOpen.set(false);
    this.cvService.scrollToSection(id);
  }

  toggleMobile(): void {
    this.mobileOpen.update(v => !v);
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
