<template>
  <div class="hello">
    <h1>Registros</h1>
    <div class="component records">
      <div class="records-group">
        <h2>Banco</h2>
        <Record
          class="component record"
          v-for="(data, recordType) in recordData"
          :key="recordType"
          :name="recordType"
          :recordData="data"
        />
      </div>

      <div class="records-group">
        <h2>Procesador</h2>
        <Record
          class="component record"
          v-for="(data, recordType) in processorRecords"
          :key="recordType"
          :name="recordType"
          :recordData="data"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import Record from "./Record.vue";

export default Vue.extend({
  name: "Records",
  components: {
    Record,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("processor", ["recordData", "processorRecords"]),
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

.records {
  padding: 10px;
}

.records-group {
  margin: 10px;
}

.component {
  display: flex;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
}

.record {
  margin-bottom: 10px;
}
</style>
