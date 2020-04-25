import { ModalComponent } from './modal/modal.component';
import { CatalogService } from './catalog.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import AOS from 'aos';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  // Lista dos items
  data: any[];

  idTest = 'tt2250912';

  // Total de rsultados encontdados
  totalResults: number;

  // Filtros dos tipos dos itens
  filterOptions = [
    {
      key: 'all',
      value: 'All'
    },
    {
      key: 'movie',
      value: 'Movie'
    },
    {
      key: 'series',
      value: 'Series'
    },
    {
      key: 'episode',
      value: 'Episode'
    }
  ];

  // FormContro para o campo de busca por texto
  controlSearch = new FormControl();

  // FormControl para Select com os tipos dos itens
  controlSelect = new FormControl('all');

  // Valor da pesquisa anterior
  previousSearch: string;

  // Acesso ao componente de paginação
  @ViewChild('matPaginator', { static: false }) matPaginator: MatPaginator;

  // Flag de loading dos ados
  loading: boolean;

  // Flag para erro na busca dosd ados
  error: boolean;

  currentYear = new Date().getFullYear();

  textError: string;

  constructor(
    private catalogService: CatalogService,
    private dialog: MatDialog) {

    this.data = [];
  }

  ngOnInit(): void {

    // Inicializa a biblioteca de mostar
    // itens com scroll da página
    AOS.init(
      {
        offset: 80,
        once: true
      }
    );
  }

  ngAfterViewInit(): void {
    const preloader = document.getElementById('preloader');

    preloader.className = 'fade';
    setTimeout(() => {
      preloader.style['display'] = 'none';
    }, 300);
  }

  /**
   * Busca os dados da lista
   * @param nextPage indice da página
   */
  search(nextPage?: number): void {
    let text: string;
    let page;
    const type = this.controlSelect.value;

    // Verifica se o campo busca foi preenchido
    if (!this.controlSearch.value) {
      return;
    }

    this.loading = true;


    // Verifica se é pra passar de página
    if (nextPage) {
      text = this.previousSearch;
      page = nextPage;
    } else {
      text = this.controlSearch.value;
      nextPage = 1;
      this.matPaginator.firstPage();
      this.previousSearch = text;
    }

    this.catalogService.searchByName(text, page, type).
      then((list: any) => {
        console.log(list);
        if (list.Response === 'True') {
          this.data = list.Search;
          this.totalResults = list.totalResults;
          this.error = false;
        } else {
          this.data = [];
          this.error = true;
          this.textError = list.Error;
        }
      })
      .catch(error => {
        console.error(error);
        this.textError = error.Error;
        this.error = true;
      })
      .finally(() => {
        this.loading = false;
      });
  }

  /**
   * Abre modal com info do filme/serie/episodio
   * @param imdbID id do item
   */
  openModal(imdbID: string): void {
    this.dialog.open(ModalComponent, {
      width: '70vh',
      maxHeight: '55vh',
      minHeight: '45vh',
      autoFocus: false,
      data: imdbID
    });
  }

  /**
   * Trata o índica da página anterior/próxima
   * @param event evento disparado quando muda a página
   */
  changePage(event: PageEvent): void {
    const page = event.pageIndex + 1;
    this.search(page);
  }
}
