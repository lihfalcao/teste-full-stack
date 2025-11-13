import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-success-snackbar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './success-snackbar.component.html',
  styleUrls: ['./success-snackbar.component.css']
})
export class SuccessSnackbarComponent {
  @Input() show: boolean = false;
  @Input() message: string = 'Entidade criada com sucesso';
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}

