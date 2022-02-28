import { HeaderComponent } from './../../components/template/header/header.component';
import { StorageService } from './../../services/storage/storage.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, HeaderComponent],
  providers: [StorageService],
  exports: [HeaderComponent]
})
export class HomePageModule {}
