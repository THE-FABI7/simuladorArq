<template>
  <div class="hello">
    <h1>Memoria Ram</h1>

    <div class="component instruction-content">
      <h2>Instrucciones</h2>
      <div
        class="component"
        v-for="(instruction, key) in getMemoryData"
        :key="key"
      >
        <div class="record">
          <div class="address">{{ key }}</div>
          <div class="divider"></div>
          <div class="record-data">
            <div class="instruction">{{ instruction.address }}</div>
            <div class="divider"></div>
            <div class="instruction">{{ instruction.value }}</div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="component instruction-content">
      <h2>Datos</h2>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapState } from "vuex";
export default Vue.extend({
  name: "MemoryRam",
  data() {
    return {};
  },
  computed: {
    ...mapState("processor", ["memoryData"]),
    ...mapGetters("processor", ["getMemoryData"]),
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
  color: #333;
}

h2 {
  font-size: 14px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 10px;
  color: #666;
}

.component {
  border: 1px solid #ddd;
  border-radius: 4px;
  max-height: 300px; /* Establece la altura máxima deseada */
  overflow-y: auto; /* Permite el desplazamiento vertical cuando sea necesario */
}

.instruction-content {
  padding: 10px;
}

.record {
  display: flex;
  align-items: center;
  padding: 5px;
}

.address {
  min-width: 30px;
  padding: 5px;
  background-color: #f0f0f0;
  border-radius: 4px;
  color: #333;
}

.divider {
  border-right: 1px solid #ddd;
  padding: 0 10px;
  margin: 0 5px;
}

.record-data {
  display: flex;
  align-items: center;
}

.instruction {
  flex: 1;
  padding: 5px;
  color: #333;
}
</style>
