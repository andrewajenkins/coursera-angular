import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { Promotion } from '../shared/promotion';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) { }
  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions')
      .pipe(catchError(this.processHTTPMsgService.handleError));
    // return of(PROMOTIONS).pipe(delay(2000));
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotion/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    // return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true')
      .pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
    // return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
  }
}
