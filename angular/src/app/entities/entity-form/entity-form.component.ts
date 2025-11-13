import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective } from 'ngx-mask';
import { Entity, Specialty, Region } from '../../models/entity.model';
import { EntityService } from '../../services/entity.service';
import { MultiselectDropdownComponent } from '../../shared/multiselect-dropdown/multiselect-dropdown.component';

@Component({
  selector: 'app-entity-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    NgxMaskDirective,
    MultiselectDropdownComponent,
  ],
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css'],
})
export class EntityFormComponent implements OnInit, OnChanges {
  @Input() entity: Entity | null = null;
  @Input() isLoading: boolean = false;
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() errorMessage: string = '';
  @Output() submitForm = new EventEmitter<Partial<Entity>>();
  @Output() cancel = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  entityForm!: FormGroup;
  specialities: Specialty[] = [];
  regions: Region[] = [];
  private specialitiesLoaded = false;
  private regionsLoaded = false;

  constructor(private fb: FormBuilder, private entityService: EntityService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadRegions();
    this.loadspecialities();
  }

  loadspecialities(): void {
    this.entityService.getspecialities().subscribe({
      next: (specialities: Specialty[]) => {
        this.specialities = specialities;
        this.specialitiesLoaded = true;
        this.tryLoadEntityData();
      },
      error: (error: unknown) => {
        console.error('Erro ao carregar especialidades:', error);
      },
    });
  }

  loadRegions(): void {
    this.entityService.getRegions().subscribe({
      next: (regions: Region[]) => {
        this.regions = regions;
        this.regionsLoaded = true;
        this.tryLoadEntityData();
      },
      error: (error: unknown) => {
        console.error('Erro ao carregar regionais:', error);
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['entity'] && this.entityForm) {
      this.tryLoadEntityData();
    }
  }

  initForm(): void {
    this.entityForm = this.fb.group({
      name: ['', Validators.required],
      fantasy_name: ['', Validators.required],
      cnpj: ['', [Validators.required, Validators.maxLength(18)]],
      region_id: ['', Validators.required],
      inauguration_date: ['', Validators.required],
      specialities: [[], [Validators.required, Validators.minLength(5)]],
      status: [true],
    });

    if (this.entity) {
      this.loadEntityData();
    }
  }

  loadEntityData(): void {
    if (this.entity && this.specialitiesLoaded && this.regionsLoaded) {
      let specialitiesIds: number[] = [];

      if (this.entity.specialities && Array.isArray(this.entity.specialities)) {
        specialitiesIds = this.entity.specialities.map((sp: any) => sp.id);
      }

      let regionId: number | null = null;

      if (typeof this.entity.region_id === 'number') {
        regionId = this.entity.region_id;
      } else if (this.entity.region && typeof this.entity.region === 'object') {
        regionId = Number(this.entity.region.id);
      }

      this.entityForm.patchValue({
        name: this.entity.name || '',
        fantasy_name: this.entity.fantasy_name || '',
        cnpj: this.entity.cnpj || '',
        specialities: specialitiesIds,
        region_id: regionId,
        inauguration_date: this.entity.inauguration_date
          ? this.formatDateForInput(this.entity.inauguration_date)
          : '',
        status: this.entity.status !== undefined ? this.entity.status : true,
      });
    }
  }

  formatDateForInput(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSubmit(): void {
    const formValue = this.entityForm.value;

    if (formValue.specialities && !Array.isArray(formValue.specialities)) {
      formValue.specialities = [formValue.specialities];
    }

    if (formValue.region_id) {
      formValue.region_id = Number(formValue.region_id);
    }

    this.submitForm.emit(formValue);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onDelete(): void {
    if (confirm('Tem certeza que deseja excluir esta entidade?')) {
      this.delete.emit();
    }
  }

  onspecialitiesChange(selectedIds: number[]): void {
    this.entityForm.patchValue(
      { specialities: selectedIds },
      { emitEvent: false }
    );
  }

  get isEditMode(): boolean {
    return this.mode === 'edit';
  }

  get pageTitle(): string {
    return this.isEditMode ? 'Editar entidade' : 'Criar entidade';
  }

  get submitButtonText(): string {
    if (this.isLoading) {
      return this.isEditMode ? 'Salvando...' : 'Salvando...';
    }
    return this.isEditMode ? 'Editar' : 'Salvar';
  }

  private tryLoadEntityData(): void {
    if (this.entity && this.entityForm) {
      if (this.specialitiesLoaded && this.regionsLoaded) {
        this.loadEntityData();
      }
    }
  }
}
