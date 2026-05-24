import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appIntersection]',
  standalone: true
})
export class IntersectionObserverDirective implements OnInit, OnDestroy {
  @Input() intersectionThreshold = 0.2;
  @Input() intersectionRootMargin = '0px';
  @Output() inView = new EventEmitter<boolean>();

  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        this.inView.emit(entry.isIntersecting);
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      {
        threshold: this.intersectionThreshold,
        rootMargin: this.intersectionRootMargin
      }
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
