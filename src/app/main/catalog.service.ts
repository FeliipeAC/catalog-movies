import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  // Key de acesso a API omdbAPI
  private apiKey = '46e1359f';

  // URL básico de requisição
  private apiUrl = 'http://www.omdbapi.com/?apikey=' + this.apiKey + '&';


  constructor(private http: HttpClient) { }

  /**
   * Busca a lista de dados pelo título
   * @param name nome do filme/serie/episodio
   * @param page número da página
   * @param type tipo do item
   */
  searchByName(name: string, page: number, type: string): Promise<any> {
    let url = this.apiUrl + 's=' + name + '&page=' + page;
    if (type !== 'all') {
      url = url + '&type=' + type;
    }

    return this.http.get(url).toPromise();
  }

  /**
   * Busca os dados de um item pelo id
   * @param imdbId id do item
   */
  getByimdbId(imdbId: string): Promise<any> {
    return this.http.get(this.apiUrl + '&i=' + imdbId).toPromise();
  }
}
