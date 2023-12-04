import { Getter } from "vuex";
import { ProcessorState } from "./state";

export const agetInstance: Getter<ProcessorState, unknown> = (state) => {
  state.isBusEnabled = true;
  return new Promise((resolve: any) => {
    setTimeout(() => {
      state.isBusEnabled = false;
      // Realiza las operaciones necesarias dentro del timeout
      resolve("hola");
    }, state.cycleTime); // Tiempo de espera en milisegundos (2 segundos en este ejemplo)
  });
};

export const getMemoryData: Getter<ProcessorState, unknown> = (state) => {
  return state.memoryData;
};
