<template>
  <div class="bus">
    <span class="title">Bus</span>
    <div v-if="isBusEnabled" class="enabled">
      <span> {{ busMessage }} </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters } from "vuex";

export default Vue.extend({
  name: "BUS",
  data() {
    return {};
  },
  computed: {
    ...mapState("processor", ["busMessage", "isBusEnabled"]),
    ...mapGetters("processor", ["getInstance"]),
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bus {
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
