import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { responseType } from './image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(private http: HttpClient) { }

  getImageUrl(file:File){

    let headers = new HttpHeaders({
      'X-LOGIDOTS': '11234',
      'cache-control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
      'accept': 'application/json'
  });
    const formdata: FormData = new FormData();
    formdata.append('image', file);
    return this.http.post<responseType>(`https://assessment.logi.dev/image.php`, formdata, {headers:headers});
  }

}
