<template>
  <v-app id="app">
    <div class="welcome-screen">
      <h1>SIMULADOR DE PROCESADOR</h1>
      <p>Estudiantes: Fabian Guancha -- Samuel Quiroga</p>
      <div class="animation">
        <img class="person" src="./assets/inicio.png" alt="Person 1" />
      </div>
      <nav><router-link to="/home" class="button" >Vamos a ya!!</router-link></nav>
      <router-view/>
    </div>
  </v-app>
</template>

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
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}
</style>
