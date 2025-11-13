import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-specialities-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-backdrop" (click)="close.emit()"></div>

    <div class="modal">
      <h2>Especialidades</h2>

      <ul class="spec-list">
        <li *ngFor="let s of specialities">{{ s }}</li>
      </ul>

      <button class="btn-close" (click)="close.emit()">Fechar</button>
    </div>
  `,
  styleUrls: ['./specialities-modal.component.css'],
})
export class SpecialitiesModalComponent {
  @Input() specialities: string[] = [];
  @Output() close = new EventEmitter<void>();
}
