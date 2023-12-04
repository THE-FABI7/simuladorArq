import Vue from "vue";
import Vuex from "vuex";
import processor from "./modules/processor/index";
import type { ProcessorState } from "./modules/processor/state";

/**
 * Typescript definitions for the store
 */
export type RootState = {
  processor: ProcessorState;
};

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  modules: {
    processor,
  },
});
