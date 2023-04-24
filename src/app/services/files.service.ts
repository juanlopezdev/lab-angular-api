import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';
import { tap, map } from 'rxjs/operators';

interface File {
  originalname: string;
  filename: string;
  location: string;
}
@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private apiUrl = `${environment.API_URL}/api/files`;

  constructor(
    private http: HttpClient
  ) { }

  getFile(name: string, url: string, type: string) {
    return this.http.get(url, { responseType: 'blob' })
      .pipe( // Alterar petición
        tap(content => {
          const blob = new Blob([content], { type });
          saveAs(blob, name);
        }),
        map(() => true)
      );
  }

  uploadFile(file: Blob) {
    const dto = new FormData();
    dto.append('file', file);
    return this.http.post<File>(`${this.apiUrl}/upload`, dto, {
      // Opcional según el backend, si lo necesita o no mandar una cabecera
      // headers: {
      //   'Content-type': 'multipart/form-data'
      // }
    });
  }
}
