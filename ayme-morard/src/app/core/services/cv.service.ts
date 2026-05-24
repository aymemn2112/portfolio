import { Injectable, signal, computed } from '@angular/core';
import { CV_CONTENT, CVData } from '../models/cv.models';

@Injectable({ providedIn: 'root' })
export class CvService {
  private readonly _cvData = signal<CVData>(CV_CONTENT);
  private readonly _activeSection = signal<string>('hero');
  private readonly _isLoading = signal<boolean>(true);

  readonly cvData = this._cvData.asReadonly();
  readonly activeSection = this._activeSection.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  readonly header = computed(() => this._cvData().header);
  readonly about = computed(() => this._cvData().about);
  readonly sections = computed(() => this._cvData().sections);
  readonly skillCategories = computed(() => this._cvData().skillCategories);
  readonly sectionIds = computed(() => ['hero', 'about', ...this._cvData().sections.map(s => s.id)]);

  setActiveSection(sectionId: string): void {
    this._activeSection.set(sectionId);
  }

  setLoading(loading: boolean): void {
    this._isLoading.set(loading);
  }

  scrollToSection(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
