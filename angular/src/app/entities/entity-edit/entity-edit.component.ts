import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EntityFormComponent } from '../entity-form/entity-form.component';
import { ErrorModalComponent } from '../../shared/error-modal/error-modal.component';
import { SuccessSnackbarComponent } from '../../shared/success-snackbar/success-snackbar.component';
import { EntityService } from '../../services/entity.service';
import { Entity } from '../../models/entity.model';

@Component({
  selector: 'app-entity-edit',
  standalone: true,
  imports: [
    CommonModule,
    EntityFormComponent,
    ErrorModalComponent,
    SuccessSnackbarComponent,
  ],
  template: `
    <app-entity-form
      [mode]="'edit'"
      [entity]="entity"
      [isLoading]="isLoading"
      [errorMessage]="''"
      (submitForm)="onSubmit($event)"
      (cancel)="onCancel()"
      (delete)="onDelete()"
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
export class EntityEditComponent implements OnInit {
  entity: Entity | null = null;
  isLoading: boolean = false;
  showErrorModal: boolean = false;
  showSuccessSnackbar: boolean = false;
  errorTitle: string = 'Erro ao salvar';
  errorStatus: number | null = null;
  errorMessage: string = '';
  successMessage: string = 'Entidade atualizada com sucesso';
  entityId!: number;

  constructor(
    private entityService: EntityService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.entityId = +this.route.snapshot.paramMap.get('id')!;
    this.loadEntity();
  }

  loadEntity(): void {
    this.isLoading = true;
    this.entityService.getById(this.entityId).subscribe({
      next: (entity) => {
        this.entity = entity;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorStatus = error.status || null;
        this.errorMessage =
          error.error?.message || error.message || 'Erro ao carregar entidade.';
        this.showErrorModal = true;
        console.error('Erro ao carregar entidade:', error);
      },
    });
  }

  onSubmit(entityData: Partial<Entity>): void {
    this.isLoading = true;
    this.showErrorModal = false;
    this.showSuccessSnackbar = false;

    this.entityService.update(this.entityId, entityData).subscribe({
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
          'Ocorreu um erro ao atualizar a entidade. Tente novamente.';
        this.showErrorModal = true;
        console.error('Erro ao atualizar entidade:', error);
      },
    });
  }

  onDelete(): void {
    this.isLoading = true;
    this.entityService.delete(this.entityId).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/entidades']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorStatus = error.status || null;
        this.errorMessage =
          error.error?.message ||
          error.message ||
          'Ocorreu um erro ao excluir a entidade. Tente novamente.';
        this.showErrorModal = true;
        console.error('Erro ao excluir entidade:', error);
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
