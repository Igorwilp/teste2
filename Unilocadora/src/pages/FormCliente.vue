<template>
  <q-page class="q-ma-md q-pa-md shadow-10">
    <h3>Digite suas informações:</h3>
    {{ cliente }}
    <q-form ref="form">
      <q-input outlined v-model="nome" label="Nome" :rules="validationRules.nome"></q-input>
      <q-input outlined v-model="id" label="E-mail" :rules="validationRules.id"></q-input>
      <q-input outlined v-model="senha" label="Senha" :rules="validationRules.senha"></q-input>
      <q-input outlined v-model="telefone" mask="(##)#####.####" fill-mask="_" label="Telefone" :rules="validationRules.telefone"></q-input>
      <q-input outlined v-model="cpf" label="CPF" :rules="validationRules.cpf"></q-input>

      <q-btn color="primary" label="Salvar" class="q-mt-md" @click="cadastrarCliente"></q-btn>
    </q-form>
  </q-page>
</template>

<script>
import api from "src/services/api";
import services from "src/services";
export default {
  name: "FormCliente",
  props: {
    cliente: Object,
  },
  data() {
    return {
      nome: null,
      id: null,
      senha: null,
      telefone: null,
      cpf: null,
      validationRules: {
        nome: [
          (value) => !!value || 'Nome é obrigatório'
        ],
        id: [
          (value) => !!value || 'Email é obrigatório'
        ],
        senha: [
          (value) => !!value || 'Senha é obrigatória'
        ],
        telefone: [
          (value) => !!value || 'Telefone é obrigatório'
        ],
        cpf: [
          (value) => !!value || 'Cpf é obrigatório'
        ]
      }
    }
  },
  created() {
    if (this.cliente) {
      this.clienteData = this.cliente;
    }
  },
  methods: {
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
      console.log(dataJson)
      const req = await fetch("http://localhost:3000/logins",{
        method: "POST",
        headers: { "Content-Type" : "application/json"},
        body: dataJson
      });
      const res = await req.json();
      console.log(res);
      alert("Cadastro realizado com sucesso!")
      this.$router.push("/");
    }
  },
}
</script>

<style></style>
