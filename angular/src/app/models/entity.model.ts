export interface Entity {
  id: number;
  name: string;
  fantasy_name?: string;
  cnpj?: string;
  region?: string;
  specialities?: string[] | number[];
  inauguration_date?: Date | string;
  status: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface Specialty {
  id: number;
  name: string;
}
