import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endereco } from '../models/endereco.model';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  buscaCep = "https://viacep.com.br/ws/30160907/json/";

  constructor(
    private http: HttpClient
  ) { }

  initialSearch() {
    return this.http.get<Endereco>(this.buscaCep);
  }

  public checkValidate(value: any) {
    const { cep, logradouro, complemento, ddd, bairro, localidade, uf, ibge, gia, siafi } = value;
    let valid = true;

    if (cep.length !== 9) {
      valid = false;
    } else if (logradouro.length === 0 && valid) {
      valid = false;
    } else if (complemento.length === 0 && valid) {
      valid = false;
    } else if (bairro.length === 0 && valid) {
      valid = false;
    } else if (localidade.length === 0 && valid) {
      valid = false;
    } else if (uf.length !== 2 && valid) {
      valid = false;
    } else if (ibge.length === 0 && valid) {
      valid = false;
    } else if (gia.length === 0 && valid) {
      valid = false;
    } else if (ddd.length !== 2 && valid) {
      valid = false;
    } else if (siafi.length === 0 && valid) {
      valid = false;
    }

    return valid;
  }

  public modelChangeFn(e: any, modelName: string, value: any) {
    console.log(e);
    console.log(modelName);
    console.log(value);
    return this.checkValidate(value)
  }

  _commit(endereco: Endereco) {
    localStorage.setItem("cep", endereco.cep);
  }

  add(endereco: Endereco) {
    localStorage.clear();
    this._commit(new Endereco(endereco));
  }
}
