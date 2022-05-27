import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  submitFeedback(feedback: any) {
    console.log("submitting feedback")
    return this.http.post<any>(baseURL + 'feedback', feedback)
      // .pipe(catchError(this.processHTTPMsgService.handleError));
  }

}
