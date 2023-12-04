import state, { ProcessorState } from "./state";
//import * as actions from "./actions";
import * as mutations from "./mutations";
import * as getters from "./getters";
import { Module } from "vuex";

const integrations: Module<ProcessorState, unknown> = {
  namespaced: true,
  state,
  actions: {},
  mutations,
  getters,
};
export default integrations;
