import { AlertController } from '@ionic/angular';
import { StorageService } from './../../services/storage/storage.service';
import { Component, OnInit } from '@angular/core';
import { Category, Finance } from 'src/app/models/finances.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  categories:Category[] = [] //enabled ones

  allCategories:Category[] = [] //all

  finance:Finance = {
    category:'',
    value: null,
    type: '',
    dateCreation: (new Date()).toISOString().slice(0, 19).replace(/-/g, "-").replace("T", " ")
  }

  allFinances:Finance[] = []

  constructor(private storageService:StorageService, public alertController: AlertController) {}

  ngOnInit() { 
    
  }
    
  ionViewDidEnter() {
    this.storageService.get('categories').then(categories => {

      if(categories) this.allCategories = categories

      this.categories = this.allCategories.filter(category => {return category.visible === true})
      
    })

    this.storageService.get('finances').then(finances => {
      if(finances) this.allFinances = finances
    })
  }

  regNewFinance() {

    if(!this.finance.value) {
      this.presentAlert('Valor')
      return
    }

    if(!this.finance.category) {
      this.presentAlert('Categoria')
      return
    }

    if(isNaN(this.finance.value)) {
      this.presentAlert('Valor','A seguinte informação não está correta')
      return
    }

    if(this.finance.value.toString().includes('-')) {
      this.presentAlert('Valor','Não utilize sinais no campo de')
      return
    }

    if(this.finance.type === 'gasto') this.finance.value = this.finance.value * -1

    this.allFinances.push({...this.finance})

    this.storageService.set('finances',this.allFinances).then(() => {
      this.finance.type = ''
      this.finance.value = null
      this.finance.dateCreation = (new Date()).toISOString().slice(0, 19).replace(/-/g, "-").replace("T", " ")
    })
  }

  setType() {
    this.finance.type = this.categories.find(r => {if(r.title === this.finance.category) return r}).type
  }

  async presentAlert(infoFaltante:string,msg='Está faltando a seguinte informação') {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Oops!',
      message: `${msg}:<br><br>${infoFaltante}`,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  deleteFinance(indice) {
    this.allFinances.splice(this.allFinances.length - (1+indice),1) // segundo elemento aponta quantos itens serão removidos do array
    this.storageService.set('finances',this.allFinances)
  }

}
