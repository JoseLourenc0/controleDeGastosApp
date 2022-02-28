import { PagesService } from './services/page/pages.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = []

  constructor(private pagesService:PagesService) {
    this.appPages = pagesService.getPages()
  }
}
