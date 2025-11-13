import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EntityService } from '../../services/entity.service';
import { Entity } from '../../models/entity.model';
import { SpecialitiesModalComponent } from '../../shared/specialities-modal/specialities-modal.component';

@Component({
  selector: 'app-entity-view',
  standalone: true,
  imports: [CommonModule, MatIconModule, SpecialitiesModalComponent],
  templateUrl: './entity-view.component.html',
  styleUrls: ['./entity-view.component.css'],
})
export class EntityViewComponent implements OnInit {
  entity: Entity = {
    id: 0,
    name: '',
    fantasy_name: '',
    cnpj: '',
    region: '',
    inauguration_date: '',
    status: false,
    specialities: [],
  };
  modalSpecialities: string[] = [];
  showModal = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private entityService: EntityService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEntity(id);
  }

  loadEntity(id: number): void {
    this.isLoading = true;

    this.entityService.getById(id).subscribe({
      next: (entity) => {
        // Garantir array sempre seguro
        entity.specialities = (entity.specialities || []).map((sp: any) =>
          typeof sp === 'string' ? sp : sp?.name || sp?.nome || String(sp)
        );

        this.entity = entity;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao carregar entidade.';
      },
    });
  }

  editEntity(): void {
    this.router.navigate(['/entidades/editar', this.entity.id]);
  }

  goBack(): void {
    this.router.navigate(['/entidades']);
  }

  formatDate(date: string | Date | undefined): string {
    if (!date) return '-';
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, '0')}/${String(
      d.getMonth() + 1
    ).padStart(2, '0')}/${d.getFullYear()}`;
  }

  formatspecialities(specs: any[]): string {
    if (!specs || specs.length === 0) return '-';

    const names = specs
      .map((sp) =>
        typeof sp === 'string' ? sp : sp?.name || sp?.nome || String(sp)
      )
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, 'pt-BR'));

    if (names.length <= 2) return names.join(', ');

    return `${names[0]}, ${names[1]},`;
  }

  getRemainingSpecialties(specs: any[]): number {
    if (!specs) return 0;
    return Math.max(0, specs.length - 2);
  }

  openModal(specialities: any[]): void {
    this.modalSpecialities = specialities
      .map((sp) =>
        typeof sp === 'string' ? sp : sp?.name || sp?.nome || String(sp)
      )
      .sort((a, b) => a.localeCompare(b, 'pt-BR'));

    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
