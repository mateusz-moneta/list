import { HttpErrorResponse } from '@angular/common/http';

export interface GetCompanySummaryListFailActionPayload {
  companySummaryListError: HttpErrorResponse;
}
