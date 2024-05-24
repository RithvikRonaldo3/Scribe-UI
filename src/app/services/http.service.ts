import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseUrl = environment.url;
  constructor(private http: HttpClient) {}

  public getSignedUrl(data: any) {
    return this.http.post(this.baseUrl + 'audioScribe/get-signed-url', data);
  }

  public getObjectContent(data: any) {
    return this.http.post(this.baseUrl + 'audioScribe/get-object', data);
  }

  public uploadAudioS3(payload: any) {
    return this.http.put(`${payload.url}`, payload.data, { headers: {} });
  }

  public getUserScribe(payload: any) {
    return this.http.post(
      `${this.baseUrl}audioScribe/get-user-scribe`,
      payload,
      { headers: {} }
    );
  }

  public startTranscribeJob(payload: any) {
    return this.http.post(
      this.baseUrl + 'audioScribe/start-transcribe',
      payload
    );
  }

  public getTranscribeJob(payload: any) {
    return this.http.post(this.baseUrl + 'audioScribe/get-transcribe', payload);
  }
}
