import { StorageService } from './../../services/storage/storage.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/finances.model';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  newCategoryInfo:Category = {
    title: '',
    type: '',
    visible: true,
    dateCreation: (new Date()).toISOString().slice(0, 19).replace(/-/g, "-").replace("T", " ")
  }

  categories:Category[] = []

  constructor(private storageService: StorageService,public alertController: AlertController, private router: Router) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.storageService.get('categories').then(categories => {
      if(categories) this.categories = categories
    })
  }

  regNewCategory () {

    if(!this.newCategoryInfo.type) {
      this.presentAlert('Tipo de Gasto')
      return
    }

    if(!this.newCategoryInfo.title) {
      this.presentAlert('Título da Categoria')
      return
    }

    this.categories.push({...this.newCategoryInfo}) // utilizando destructuring para não referenciar variável nos inputs
    this.storageService.set('categories',this.categories)

    this.newCategoryInfo.title = ''
    this.newCategoryInfo.type = ''

  }

  async presentAlert(infoFaltante:string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Oops!',
      message: `Está faltando a seguinte informação:<br><br>${infoFaltante}`,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  deleteCategory (indice) {

    this.categories.splice(indice,1) // segundo elemento aponta quantos itens serão removidos do array
    this.storageService.set('categories',this.categories)
  }

  setState() {

    setTimeout(() => {
      this.storageService.set('categories',this.categories)
    },100)
  }

  doRefresh(event) {

      this.router.navigate(['/categories'])
      event.target.complete();
  }
}
