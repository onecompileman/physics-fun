import { Directive, ElementRef, Renderer2, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GameProgress } from '../models/game-progress.model';

@Directive({
  selector: '[pfGameProgress]'
})
export class GameProgressDirective implements OnChanges, OnInit {

  @Input() progressField: string;
  @Input() gameProgress: GameProgress;


  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.checkProgress(this.progressField, this.gameProgress);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkProgress(this.progressField, this.gameProgress);
  }

  private checkProgress(progressField: string, gameProgress: GameProgress): void {
    const fieldValue = this.getProgressValue(progressField, gameProgress);
    const disableClass = 'disable-progress';
    if (!fieldValue) {
      this.renderer.addClass(this.elementRef.nativeElement, disableClass);
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, disableClass);
    }
  }

  private getProgressValue(progressField: string, gameProgress: GameProgress): boolean {
    const progressFields = this.progressField.split('.');
    return progressFields.reduce((progress, field) => progress[field], this.gameProgress);
  }

}
