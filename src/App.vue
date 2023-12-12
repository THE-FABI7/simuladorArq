<template>
  <v-app id="app">
    <div class="welcome-screen">
      <h1>SIMULADOR DE PROCESADOR</h1>
      <h3>Estudiantes: Fabian Guancha -- Samuel Quiroga</h3>
      <br>
      <div class="animation">
        <img class="person" src="./assets/inicio.png" alt="Person 1" />
      </div>
      <nav><router-link to="/home" class="button" @click.native="showSnackbar = true">Vamos a ya!!</router-link></nav>
      <br>
      <router-view/>
    </div>
    <v-snackbar
      v-model="showSnackbar"
      color="info"
      :timeout="5000"
      :top="true"
      :bottom="false"
      :right="false"
      :left="false"
    >
      Se deben agregar las instrucciones en la caja de instrucciones,
      posteriormente presionar en iniciar
      <v-btn
        color="red"
        text
        @click="showSnackbar = false"
      >
        Cerrar
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      showSnackbar: false,
    };
  },
}
</script>

<style>
#app {
  background-image: url("./assets/fondo.png");
  background-size: cover;
  font-family: "Bangers", sans-serif;
  text-align: center;
}


.welcome-screen {
  padding: 50px;
}

.welcome-screen h1 {
  font-size: 3em;
  color: #080b11;
}

.welcome-screen p {
  color: #080b11;
  font-size: 1.5em;
}

.button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #080b11;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #283593;
}

.person {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
