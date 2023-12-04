<template>
  <div class="record">
    <span class="name">{{ name }}</span>
    <div class="component">
      <div class="record-data">
        <div class="divider"></div>
        <div class="value">{{ recordData.value }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Record",
  data() {
    return {
      programCounter: 0,
    };
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    recordData: {
      type: Object as () => RecordData,
    },
  },
});
</script>

<style scoped>
.record {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.name {
  font-weight: bold;
  margin-right: 10px;
  color: #333;
}

.component {
  border: 1px solid #ddd;
  flex-grow: 1;
  padding: 10px;
}

.record-data {
  display: flex;
  align-items: center;
}

.divider {
  border-right: 1px solid #bbb;
  padding-left: 10px;
  padding-right: 10px;
}

.value {
  flex-grow: 1;
  color: #666;
}
</style>
