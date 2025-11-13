import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { EntityService } from '../../services/entity.service';
import { Entity } from '../../models/entity.model';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-entity-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css'],
})
export class EntityListComponent implements OnInit {
  entities: Entity[] = [];
  filteredEntities: Entity[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;

  private searchSubject = new Subject<string>();

  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' | null = null;

  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalPages: number = 0;

  constructor(private entityService: EntityService, private router: Router) {}

  ngOnInit(): void {
    this.loadEntities();

    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => this.applyFilter(term));
  }

  loadEntities(): void {
    this.isLoading = true;
    this.entityService.getAll().subscribe({
      next: (data) => {
        this.entities = data.map((entity: Entity) => {
          // Mantido igual ao seu código
          if (entity.specialities) {
            if (Array.isArray(entity.specialities)) {
              entity.specialities = entity.specialities.map((sp: any) => {
                return typeof sp === 'string'
                  ? sp
                  : sp.name || sp.nome || String(sp);
              });
            } else {
              entity.specialities = [];
            }
          } else {
            entity.specialities = [];
          }

          return entity;
        });

        this.filteredEntities = [...this.entities];
        this.updatePagination();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  onSearch(): void {
    this.searchSubject.next(this.searchTerm);
  }

  applyFilter(term: string): void {
    const search = term.trim().toLowerCase();

    if (!search) {
      this.filteredEntities = [...this.entities];
    } else {
      this.filteredEntities = this.entities.filter((entity) => {
        const specialities = this.formatspecialities(
          entity.specialities
        ).toLowerCase();

        return (
          entity.name?.toLowerCase().includes(search) ||
          entity.region?.toLowerCase().includes(search) ||
          specialities.includes(search)
        );
      });
    }

    this.applySorting();
    this.currentPage = 1;
    this.updatePagination();
  }

  toggleSort(column: string): void {
    if (this.sortColumn !== column) {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    } else {
      if (this.sortDirection === 'asc') this.sortDirection = 'desc';
      else if (this.sortDirection === 'desc') this.sortDirection = null;
      else this.sortColumn = null;
    }

    this.applySorting();
  }

  applySorting(): void {
    if (!this.sortColumn || !this.sortDirection) return;

    this.filteredEntities.sort((a: any, b: any) => {
      const A = a[this.sortColumn as keyof Entity] ?? '';
      const B = b[this.sortColumn as keyof Entity] ?? '';

      return this.sortDirection === 'asc'
        ? A.localeCompare(B)
        : B.localeCompare(A);
    });
  }

  formatspecialities(
    specialities: string[] | number[] | any[] | undefined
  ): string {
    if (!specialities) return '-';
    if (!Array.isArray(specialities)) return '-';
    if (specialities.length === 0) return '-';

    const names = specialities
      .map((sp: any) => {
        if (typeof sp === 'string') return sp;
        if (typeof sp === 'number') return String(sp);
        return sp.name || sp.nome || String(sp);
      })
      .filter((name: string) => name && name !== 'undefined');

    const sortedNames = names.sort((a, b) => a.localeCompare(b, 'pt-BR'));

    if (sortedNames.length <= 2) {
      return sortedNames.join(', ');
    }

    const firstTwo = sortedNames.slice(0, 2);
    const remaining = sortedNames.length - 2;

    return `${firstTwo.join(', ')}, + ${remaining}`;
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(
      this.filteredEntities.length / this.itemsPerPage
    );
  }

  getPaginatedEntities(): Entity[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEntities.slice(start, start + this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.onSearch();
  }

  goToCreate(): void {
    this.router.navigate(['/entidades/adicionar']);
  }

  viewEntity(id: number): void {
    this.router.navigate(['/entidades/visualizar', id]);
  }

  editEntity(id: number): void {
    this.router.navigate(['/entidades/editar', id]);
  }
}
