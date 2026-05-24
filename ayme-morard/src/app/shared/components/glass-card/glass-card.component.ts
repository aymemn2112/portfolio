import { Component, Input, booleanAttribute } from '@angular/core';

@Component({
  selector: 'app-glass-card',
  standalone: true,
  template: `
    <div class="glass-card" [class.hover-lift]="hoverLift" [class.no-padding]="noPadding">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .glass-card {
      background: var(--glass-bg);
      backdrop-filter: blur(var(--glass-blur));
      -webkit-backdrop-filter: blur(var(--glass-blur));
      border: 1px solid var(--glass-border);
      border-radius: 16px;
      box-shadow: var(--glass-shadow);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
    }

    .glass-card:hover {
      background: var(--glass-bg-hover);
      border-color: var(--glass-border-hover);
    }

    .hover-lift:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
    }

    .no-padding {
      padding: 0;
    }
  `]
})
export class GlassCardComponent {
  @Input({ transform: booleanAttribute }) hoverLift = true;
  @Input({ transform: booleanAttribute }) noPadding = false;
}
