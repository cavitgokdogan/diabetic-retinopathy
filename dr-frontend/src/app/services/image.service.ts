import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  private baseUrl = "http://127.0.0.1:50100";

  /* SEND IMAGE AS A FILE WITH FORMDATA */

  // upload(image : File): Observable<HttpEvent<any>> {
  //   const formData: FormData = new FormData();

  //   formData.append("image", image);

  //   const req = new HttpRequest('POST',  `${this.baseUrl}/dr/image/upload`, formData, {
  //     reportProgress: true,
  //     responseType: 'json',
  //   });

  //   return this.http.request(req);
  // }

  /* SEND IMAGE AS A STRING IN BLOB FORMAT */

  upload(base64Image : string | null, filename: string): Observable<HttpEvent<any>> {
    const json_data = {
      "base64image": base64Image,
      "filename" : filename
    }
    const req = new HttpRequest('POST', "http://127.0.0.1:50100/dr/image/upload", json_data);

    return this.http.request(req);
  }
}
