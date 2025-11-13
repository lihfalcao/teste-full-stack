import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EntityFormComponent } from '../entity-form/entity-form.component';
import { ErrorModalComponent } from '../../shared/error-modal/error-modal.component';
import { SuccessSnackbarComponent } from '../../shared/success-snackbar/success-snackbar.component';
import { EntityService } from '../../services/entity.service';
import { Entity } from '../../models/entity.model';

@Component({
  selector: 'app-entity-create',
  standalone: true,
  imports: [
    CommonModule,
    EntityFormComponent,
    ErrorModalComponent,
    SuccessSnackbarComponent,
  ],
  template: `
    <app-entity-form
      [mode]="'create'"
      [isLoading]="isLoading"
      [errorMessage]="''"
      (submitForm)="onSubmit($event)"
      (cancel)="onCancel()"
    ></app-entity-form>

    <app-error-modal
      [show]="showErrorModal"
      [title]="errorTitle"
      [status]="errorStatus"
      [message]="errorMessage"
      (close)="closeErrorModal()"
    ></app-error-modal>

    <app-success-snackbar
      [show]="showSuccessSnackbar"
      [message]="successMessage"
      (close)="closeSuccessSnackbar()"
    ></app-success-snackbar>
  `,
})
export class EntityCreateComponent {
  isLoading: boolean = false;
  showErrorModal: boolean = false;
  showSuccessSnackbar: boolean = false;
  errorTitle: string = 'Erro ao salvar';
  errorStatus: number | null = null;
  errorMessage: string = '';
  successMessage: string = 'Entidade criada com sucesso';

  constructor(private entityService: EntityService, private router: Router) {}

  onSubmit(entityData: Partial<Entity>): void {
    this.isLoading = true;
    this.showErrorModal = false;
    this.showSuccessSnackbar = false;

    this.entityService.create(entityData).subscribe({
      next: () => {
        this.isLoading = false;
        this.showSuccessSnackbar = true;
        setTimeout(() => {
          this.router.navigate(['/entidades']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorStatus = error.status || null;
        this.errorMessage =
          error.error?.message ||
          error.message ||
          'Ocorreu um erro ao criar a entidade. Tente novamente.';
        this.showErrorModal = true;
        console.error('Erro ao criar entidade:', error);
      },
    });
  }

  closeErrorModal(): void {
    this.showErrorModal = false;
  }

  closeSuccessSnackbar(): void {
    this.showSuccessSnackbar = false;
    this.router.navigate(['/entidades']);
  }

  onCancel(): void {
    this.router.navigate(['/entidades']);
  }
}
