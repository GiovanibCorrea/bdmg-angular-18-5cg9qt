import { Component, OnInit } from '@angular/core';
import { CepService } from '../../services/cep.service';
import { Endereco } from '../../models/endereco.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'formCep',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  public zips: any;
  public zip: any;
  public zipForm: FormGroup;
  public isValid: boolean = false;
  public endereco: Endereco;
  public cep: any;

  constructor(
    private cepService: CepService,
    private formBuilder: FormBuilder
  ) {
    this.zipForm = this.formBuilder.group({
      cep: new FormControl(''),
      logradouro: '',
      complemento: 0,
      bairro: '',
      localidade: '',
      uf: '',
      ibge: '',
      gia: '',
      ddd: 0,
      siafi: 0,
    });

    this.endereco = new Endereco;
  }

  ngOnInit() {
    this.cepService.initialSearch().subscribe((retorno: Endereco) => {
      this.endereco = retorno;

      this.zipForm.patchValue({
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
    this.isValid = this.cepService.modelChangeFn(e, modelName, this.zipForm.value);
  }

  add(zipForm: any) {
    console.log('zipForm ', zipForm);
    this.cepService.add(zipForm);
    this.popularPagina();
  }

  popularPagina() {
    this.cep = localStorage.getItem('cep');
  }
}
