import { Directive, ElementRef, HostListener, inject, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() appHighlight = '';
  _elementRef = inject(ElementRef);


  constructor() { }

  @HostListener('mouseenter') onMouseEnter() {
    this._elementRef.nativeElement.style.backgroundColor = this.appHighlight;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this._elementRef.nativeElement.style.backgroundColor = ''
  }



}
