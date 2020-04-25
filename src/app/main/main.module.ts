import { CatalogService } from './catalog.service';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './card/card.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const APP_ROUTES_MAIN: Routes = [
  {
      path: '',
      component: MainComponent,
      children: [
          {
              path: '',
              redirectTo: 'home',
          },
      ]
  }
];


@NgModule({
  declarations: [MainComponent, CardComponent, ModalComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(APP_ROUTES_MAIN),
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [ModalComponent],
  providers: [CatalogService]
})
export class MainModule { }
