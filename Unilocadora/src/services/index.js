import api from "./api";
import { useCartStore } from "src/stores/cart";
const storage = window.localStorage;

const services = {
  login (email, senha, callback){
    api.get("/logins/"+email).then ((response) => {
      if (response.data.id == undefined){
        callback (false);
      } else {
        if (response.data.senha == senha){
          api.get("/logins/" + response.data.id).then((response) => {
            callback (true);
          })
        } else {
          callback (false);
        }
      }
    }).catch((error) => {callback(false);})
  },

  async cadastrarCliente(e){
    e.preventDefault();
    const data = {
      nome: this.nome,
      id: this.id,
      senha: this.senha,
      telefone: this.telefone,
      cpf: this.cpf
    }

    const dataJson = JSON.stringify(data);
    const req = await fetch("http://localhost:3000/logins",{
      method: "POST",
      headers: { "Content-Type" : "application/json"},
      body: dataJson
    });
    const res = await req.json();
    console.log(res);
    alert("Cadastro realizado com sucesso!")
    this.$router.push("/");
  },
};


export default services;
