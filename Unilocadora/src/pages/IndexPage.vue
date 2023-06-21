<template>
  <div class="container">
    <div class="header">
      <h3>Locadora</h3>
      <q-btn color="negative" label="Sair" @click="logout" class="logout-btn"/>
    </div>
  </div>
  <div style="margin-top: -40px;">
    <h4>Filmes disponíveis:</h4>
      <div class="row justify-evenly">
        <div v-for="movie in movies" class="col-4" :key="movie.id" style="margin-bottom: 30px;">
          <li>{{ movie.title }}</li>
          <li style="margin-bottom: 15px;">R$:{{ movie.price }}</li>
          <q-btn @click="abrirSinopse(movie)" label="Sinopse" padding="xs lg"/>
          <q-btn @click="addToCart(movie)" label="Add to Cart" padding="xs lg"/>
        </div>
      <q-dialog v-model="mostrarSinopse">
        <q-card>
          <q-card-section>
            <h2>{{ filmeEscolhido.title }}</h2>
            <p>{{ filmeEscolhido.sinopse }}</p>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn label="Close" color="primary" @click="fecharSinopse" />
          </q-card-actions>
        </q-card>
      </q-dialog>
  </div>

    <h4>Seu Carrinho</h4>
    <div class="row justify-evenly">
      <div v-for="item in cartStore.cartItems" :key="item.id" style="margin-right: 20px;">
        <p>{{ item.title }}</p>
        <p>R$:{{ item.price }}</p>
        <p>Quantidade:{{ item.quantity }}</p>
        <q-btn @click="removerDoCarrinho(item)" label="Remover Filme" />
      </div>
      <p>Total: R${{ cartStore.precoTotal }}</p>
      <q-btn class="botaoLimpar" @click="cartStore.limparCarrinho" label="Limpar carrinho" />
    </div>
  </div>
</template>

<script>
import { useCartStore } from '../stores/cart';
import axios from 'axios';

export default {
  data(){
    return{
      mostrarSinopse: false,
      filmeEscolhido: null,
    }
  },
  setup() {
    const cartStore = useCartStore();
    const movies = [];

    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/movies');
        movies.push(...response.data);
      } catch (error) {
        console.error('Erro', error);
      }
    };

    const addToCart = (movie) => {
      cartStore.adicionarCarrinho(movie);
    };

    const removerDoCarrinho = (item) => {
      cartStore.removerDoCarrinho(item);
    };

    return {
      movies,
      cartStore,
      fetchMovies,
      addToCart,
      removerDoCarrinho
    };
  },
  mounted() {
    this.fetchMovies();
  },
  methods: {
    abrirSinopse(movie) {
      this.filmeEscolhido = movie;
      this.mostrarSinopse = true;
    },
    fecharSinopse() {
      this.mostrarSinopse = false;
    },
    logout(){
      this.$router.push("/");
    },

  }
  
};
</script>

<style scoped>

  .container{
    margin-top: -40px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .botaoLimpar{
    width: 200px;
    height: 20px;
    margin-left: auto;
  }

  .logout-btn {
  margin-left: auto;
}

</style>