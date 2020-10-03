import { SortDirection } from '../enum/sort-direction.enum';

export interface Sort {
  active: string;
  direction: SortDirection;
}
