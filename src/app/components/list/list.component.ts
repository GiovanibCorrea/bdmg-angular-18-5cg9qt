import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent{
  public cep: any = '';
  
  popularPagina() {
    this.cep = localStorage.getItem('cep');
  }
}
