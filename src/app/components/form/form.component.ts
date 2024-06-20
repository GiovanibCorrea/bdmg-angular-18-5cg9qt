import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CepService } from '../../services/cep.service';
import { Endereco } from '../../models/endereco.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder,FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'formCep',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  providers: [provideNgxMask({ })],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  public cepMask = '00000-000';
  public complementoMask = '0.000';
  public enderecoForm: FormGroup;
  public isValid: boolean = false;
  public endereco: Endereco;
  public formSalvo: boolean = false;
  public enderecoSalvo: any;

  constructor(
    private cepService: CepService,
    private formBuilder: FormBuilder
  ) {
    this.enderecoForm = this.formBuilder.group({
      cep: new FormControl(''),
      logradouro: '',
      complemento: '',
      bairro: '',
      localidade: '',
      uf: '',
      ibge: '',
      gia: '',
      ddd: '',
      siafi: '',
    });

    this.endereco = new Endereco;
    this.enderecoSalvo = new Endereco;
  }

  ngOnInit() {
    this.cepService.initialSearch().subscribe((retorno: Endereco) => {
      this.endereco = retorno;

      this.enderecoForm.patchValue({
        cep: this.endereco.cep,
        logradouro: this.endereco.logradouro,
        complemento: this.endereco.complemento,
        bairro: this.endereco.bairro,
        localidade: this.endereco.localidade,
        uf: this.endereco.uf,
        ibge: this.endereco.ibge,
        gia: this.endereco.gia,
        ddd: this.endereco.ddd,
        siafi: this.endereco.siafi,
      });
    })
  }

  modelChange(e: any, modelName: string) {
    this.isValid = this.cepService.updateContent(e, modelName, this.enderecoForm.value);
  }

  salvar(enderecoForm: any) {
    this.cepService.add(enderecoForm);
    this.formSalvo = false;
    this.popularPagina();
  }

  popularPagina() {
    this.enderecoSalvo.cep = localStorage.getItem('cep');
    this.enderecoSalvo.logradouro = localStorage.getItem('logradouro');
    this.enderecoSalvo.bairro = localStorage.getItem('bairro');
    this.enderecoSalvo.complemento = localStorage.getItem('complemento');
    this.enderecoSalvo.ddd = localStorage.getItem('ddd');
    this.enderecoSalvo.gia = localStorage.getItem('gia');
    this.enderecoSalvo.ibge = localStorage.getItem('ibge');
    this.enderecoSalvo.localidade = localStorage.getItem('localidade');
    this.enderecoSalvo.siafi = localStorage.getItem('siafi');
    this.enderecoSalvo.uf = localStorage.getItem('uf');
    this.formSalvo = true; 
  }
}
