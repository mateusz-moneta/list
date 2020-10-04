import { HttpErrorResponse } from '@angular/common/http';

export interface GetCompanySummaryListFailPayload {
  companySummaryListError: HttpErrorResponse;
}
