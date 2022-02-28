import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  private pages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Categories', url: '/categories', icon: 'copy' },
    { title: 'History', url: '/history', icon: 'time' },
    { title: 'Import/Export', url: '/import-export', icon: 'document' },
  ]

  constructor() { }

  getPages() {
    return this.pages
  }
}
