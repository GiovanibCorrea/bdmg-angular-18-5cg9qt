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

  public validateForm(value: any) {
    const { cep, logradouro, complemento, ddd, bairro, localidade, uf, ibge, gia, siafi } = value;
    let valid = true;
    if (!cep) {
      valid = false;
    } else if (!logradouro) {
      valid = false;
    } else if (!complemento) {
      valid = false;
    } else if (!bairro) {
      valid = false;
    } else if (!localidade) {
      valid = false;
    } else if (!uf) {
      valid = false;
    } else if (!ibge) {
      valid = false;
    } else if (!gia) {
      valid = false;
    } else if (!ddd) {
      valid = false;
    } else if (!siafi) {
      valid = false;
    }

    return valid;
  }

  public updateContent(e: any, modelName: string, value: any) {
    console.log(e);
    console.log(modelName);
    console.log(value);
    return this.validateForm(value)
  }
  
  add(endereco: Endereco) {
    localStorage.clear();
    this.subirLocalStorage(new Endereco(endereco));
  }

  subirLocalStorage(endereco: Endereco) {
    localStorage.setItem("cep", endereco.cep);
    localStorage.setItem("logradouro", endereco.logradouro);
    localStorage.setItem("uf", endereco.uf);
    localStorage.setItem("localidade", endereco.localidade);
    localStorage.setItem("complemento", endereco.complemento);
    localStorage.setItem("bairro", endereco.bairro);
    localStorage.setItem("ddd", endereco.ddd);
    localStorage.setItem("ibge", endereco.ibge);
    localStorage.setItem("gia", endereco.gia);
    localStorage.setItem("siafi", endereco.siafi);
  }
}
