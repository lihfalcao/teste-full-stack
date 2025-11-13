import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  forwardRef,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

export interface MultiselectOption {
  id: number;
  name: string;
}

@Component({
  selector: 'app-multiselect-dropdown',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectDropdownComponent),
      multi: true,
    },
  ],
  templateUrl: './multiselect-dropdown.component.html',
  styleUrls: ['./multiselect-dropdown.component.css'],
})
export class MultiselectDropdownComponent
  implements OnInit, OnChanges, ControlValueAccessor
{
  @Input() options: MultiselectOption[] | any[] = [];
  @Input() placeholder: string = 'Selecione...';
  @Input() searchPlaceholder: string = 'Buscar...';
  @Output() selectionChange = new EventEmitter<number[]>();

  @ViewChild('dropdown', { static: false }) dropdownRef!: ElementRef;
  @ViewChild('searchInput', { static: false }) searchInputRef!: ElementRef;

  selectedIds: number[] = [];
  filteredOptions: MultiselectOption[] = [];
  searchTerm: string = '';
  isOpen: boolean = false;

  private onChange = (value: number[]) => {};
  private onTouched = () => {};

  ngOnInit(): void {
    this.filteredOptions = [...this.options];
  }

  ngOnChanges(changes: any): void {
    if (changes['options'] && this.options) {
      this.filteredOptions = [...this.options];
      if (this.searchTerm) {
        this.applyFilter();
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (
      this.dropdownRef &&
      !this.dropdownRef.nativeElement.contains(event.target)
    ) {
      this.isOpen = false;
    }
  }

  writeValue(value: number[]): void {
    if (value && Array.isArray(value)) {
      this.selectedIds = [...value];
    } else {
      this.selectedIds = [];
    }
  }

  registerOnChange(fn: (value: number[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      // Garantir que todas as opções estejam visíveis ao abrir
      this.filteredOptions = [...this.options];
      this.searchTerm = '';
      if (this.searchInputRef) {
        setTimeout(() => {
          this.searchInputRef.nativeElement.value = '';
          this.searchInputRef.nativeElement.focus();
        }, 0);
      }
    }
  }

  onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchTerm = term;
    this.applyFilter();
  }

  applyFilter(): void {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filteredOptions = [...this.options];
    } else {
      this.filteredOptions = this.options.filter((option) =>
        option.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  toggleSelection(optionId: number): void {
    const index = this.selectedIds.indexOf(optionId);
    if (index > -1) {
      this.selectedIds.splice(index, 1);
    } else {
      this.selectedIds.push(optionId);
    }
    this.onChange(this.selectedIds);
    this.selectionChange.emit(this.selectedIds);
  }

  isSelected(optionId: number): boolean {
    return this.selectedIds.includes(optionId);
  }

  removeSelection(optionId: number, event: Event): void {
    event.stopPropagation();
    const index = this.selectedIds.indexOf(optionId);
    if (index > -1) {
      this.selectedIds.splice(index, 1);
      this.onChange(this.selectedIds);
      this.selectionChange.emit(this.selectedIds);
    }
  }

  getSelectedOptions(): MultiselectOption[] {
    return this.options.filter((opt) => this.selectedIds.includes(opt.id));
  }

  getDisplayText(): string {
    const selected = this.getSelectedOptions();
    if (selected.length === 0) {
      return this.placeholder;
    }
    if (selected.length === 1) {
      return selected[0].name;
    }
    return `${selected.length} selecionadas`;
  }
}

