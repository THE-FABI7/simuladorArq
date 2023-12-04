<template>
  <div class="main-view">
    <div class="processor">
      <div class="component">
        <ALU />
      </div>
      <div class="bus-component">
        <v-form class="form">
          <v-textarea
            v-model="data"
            class="text-field"
            label="Instrucciones"
            outlined
            no-resize
          ></v-textarea>
          <v-text-field outlined label="Ciclo de tiempo" v-model="time">
          </v-text-field>
          <div class="options">
            <v-btn small @click="transferData">Iniciar</v-btn>
          </div>
        </v-form>
        <div class="bus">
          <Bus></Bus>
        </div>
        <div class="component control-unit">
          <ControlUnit />
        </div>
      </div>

      <div class="component memory-ram">
        <MemoryRam />
      </div>
    </div>
    <div class="component">
      <Records />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ControlUnit from "../components/ControlUnit.vue";
import ALU from "../components/ALU.vue";
import Bus from "../components/Bus.vue";
import MemoryRam from "@/components/MemoryRam.vue";
import Records from "../components/Records.vue";
import { mapMutations } from "vuex";

export default Vue.extend({
  name: "MainView",
  components: {
    ControlUnit,
    ALU,
    Bus,
    MemoryRam,
    Records,
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
  margin: 30px;
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 4px;
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
}

.control-unit {
  width: 250px;
  height: 140px;
}

.memory-ram {
  width: 300px;
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

.bus-component {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.bus {
  border: 1px solid #ddd;
  width: 250px;
  height: 140px;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f6;
  border-radius: 4px;
}

.options {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.options v-btn {
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
}

.options v-btn:hover {
  background-color: #0056b3;
}
</style>
