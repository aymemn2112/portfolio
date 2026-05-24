import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _theme = signal<Theme>('dark');

  readonly theme = this._theme.asReadonly();

  constructor() {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) {
      this._theme.set(saved);
    }
    this.applyTheme(this._theme());
  }

  toggle(): void {
    const next = this._theme() === 'dark' ? 'light' : 'dark';
    this._theme.set(next);
    localStorage.setItem('theme', next);
    this.applyTheme(next);
  }

  private applyTheme(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
