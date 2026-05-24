import { Component, inject, AfterViewInit } from '@angular/core';
import { CvService } from '../../core/services/cv.service';
import { IntersectionObserverDirective } from '../../core/directives/intersection-observer.directive';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { ParticleBgComponent } from '../../shared/components/particle-bg/particle-bg.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GlassCardComponent, ParticleBgComponent, IntersectionObserverDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  private cvService = inject(CvService);

  header = this.cvService.header;
  about = this.cvService.about;
  sections = this.cvService.sections;
  skillCategories = this.cvService.skillCategories;

  ngAfterViewInit(): void {
    this.cvService.setLoading(false);
  }

  getSection(id: string) {
    return this.sections().find(s => s.id === id);
  }

  scrollTo(sectionId: string): void {
    this.cvService.scrollToSection(sectionId);
  }

  getGradient(level: number): string {
    if (level >= 75) return 'linear-gradient(90deg, var(--primary), var(--secondary))';
    if (level >= 60) return 'linear-gradient(90deg, var(--primary), var(--primary-light))';
    return 'linear-gradient(90deg, var(--primary), rgba(124,58,237,0.6))';
  }
}
