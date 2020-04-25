import { CatalogService } from './../catalog.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  // Dados do item
  dados;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public imdbID: string,
    private catalogService: CatalogService
  ) { }

  ngOnInit(): void {
    this.getDados();
  }

  /**
   * Busca dos dados do item pelo id
   */
  getDados(): void {
    this.catalogService.getByimdbId(this.imdbID)
      .then(result => {
        this.dados = result;
      })
      .catch(console.error);
  }

  /**
   * Retorna o valor do rating em %
   */
  ratingPercent(): number {
    return parseInt(this.dados.imdbRating, 10) * 10;
  }
}
