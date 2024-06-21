export interface EnderecoDto {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
  }
  
  export class Endereco {
    public cep: string;
    public logradouro: string;
    public complemento: string;
    public bairro: string;
    public localidade: string;
    public uf: string;
    public ibge: string;
    public gia: string;
    public ddd: string;
    public siafi: string;
  
    constructor(
      { cep, logradouro, complemento, bairro, localidade, uf, ibge, gia, ddd, siafi }: EnderecoDto = {
        cep: '',
        logradouro: '',
        complemento: '',
        bairro: '',
        localidade: '',
        uf: '',
        ibge: '',
        gia: '',
        ddd: '',
        siafi: ''
      }
    ) {
      this.cep = cep;
      this.logradouro = logradouro;
      this.complemento = complemento;
      this.bairro = bairro;
      this.localidade = localidade;
      this.uf = uf;
      this.ibge = ibge;
      this.gia = gia;
      this.ddd = ddd;
      this.siafi = siafi;
    }
  }