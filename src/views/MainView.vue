<template>
  <div class="main-view">
    <div class="processor">
      <div class="bus-component">
        <v-form class="form">
          <v-textarea
            v-model="data"
            class="text-field"
            label="Instrucciones"
            outlined
            no-resize
            placeholder="mov AL 2, add AL 3, mul AL 4, sub AL 5"
          ></v-textarea>
          <v-text-field outlined label="Ciclo de tiempo" v-model="time">
          </v-text-field>
          <div class="options">
            <v-btn small color="green" @click="transferData">Iniciar</v-btn>
          </div>
        </v-form>

        <div class="component control-unit">
          <ControlUnit />
        </div>
      </div>
      <div class="component">
        <ALU />
      </div>
      <div class="component">
        <Records />
      </div>
      <div class="bus">
        <Bus></Bus>
      </div>
      <div class="component memory-ram">
        <MemoryRam />
      </div>
    </div>
      <br>
      
       
      <Footer />
    

  </div>

</template>

<script lang="ts">
import Vue from "vue";
import ControlUnit from "../components/ControlUnit.vue";
import ALU from "../components/ALU.vue";
import Bus from "../components/Bus.vue";
import MemoryRam from "@/components/MemoryRam.vue";
import Records from "../components/Records.vue";
import Footer from "../components/Footer.vue";
import { mapMutations } from "vuex";

export default Vue.extend({
  name: "MainView",
  components: {
    ControlUnit,
    ALU,
    Bus,
    MemoryRam,
    Records,
    Footer,
  },
  data() {
    return {
      data: null,
      time: 5000,
    };
  },
  methods: {
    ...mapMutations("processor", ["transferDataMemoryToRecord"]),
    transferData() {
      this.transferDataMemoryToRecord({ data: this.data, time: this.time });
    },
  },
});
</script>

<style scoped>
.main-view {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around; /* Distribuye los elementos hijos uniformemente */
  flex-wrap: wrap;
  margin: 1px;
  padding: 20px;
  border-radius: 10px;
  height: 100vh; /* Altura al 100% de la altura de la ventana del navegador */
  width: 100%;
}

.processor {
  display: flex;
  justify-content: center;
  margin: 30px;
}

.component {
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin: 5px;
}

.control-unit {
  width: 250px;
  height: 200px;
}

.memory-ram {
  width: 290px;
}

.text-field {
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
}

.form {
  border: 1px solid #ddd;
  padding: 30px;
  background-color: #fff;
  border-radius: 4px;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.bus {
  border: 1px solid #ddd;
  width: 250px;
  height: 140px;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f6;
  border-radius: 4px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  animation: float 2s ease-in-out infinite;
}

.options {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
