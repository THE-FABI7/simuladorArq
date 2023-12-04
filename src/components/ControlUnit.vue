<template>
  <div class="control-unit">
    <span class="title">Unidad de Control</span>
    <div v-if="isBusEnabled" class="enabled">
      <span> Accediendo al Bus </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "ControlUnit",
  data() {
    return {};
  },
  computed: {
    ...mapState("processor", ["isBusEnabled"]),
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.control-unit {
  text-align: center;
  padding: 10px;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.enabled {
  background-color: #6bbc97;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
  color: white;
}
</style>
