import type { Mutation } from "vuex";
import { ProcessorState } from "./state";
import { AVAILABLES_PROCESSOR_RECORDS as AVAILABLES_RECORDS } from "@/config/constants";
import Vue from "vue";

/**
 * La función `transferDataMemoryToRecord` toma datos y tiempo, borra los datos de la memoria en el
 * estado, establece el tiempo del ciclo, divide los datos en instrucciones y agrega cada instrucción a
 * los datos de la memoria en el estado.
 * @param state - El parámetro "estado" es un objeto que representa el estado actual del procesador.
 * Contiene varias propiedades y valores que almacenan información sobre la memoria del procesador, el
 * tiempo de ciclo y otros datos relevantes.
 * @param  - - `estado`: El estado actual del procesador.
 * @returns nada (indefinido).
 */
export const transferDataMemoryToRecord: Mutation<ProcessorState> = async (
  state,
  { data, time }
) => {
  state.memoryData = {};
  if (!data || !time) return;

  state.cycleTime = time;

  const instructions = data.split("\n");

  instructions.forEach((instruction: string, index: number) => {
    if (!instruction) return;

    Vue.set(state.memoryData, index, {
      address: "inmediato",
      value: instruction,
    });
  });

  moveInstructions(state, instructions);
};
/**
 * La función `moveInstructions` itera a través de una serie de instrucciones, realiza algunas
 * operaciones en un objeto `ProcessorState` e incrementa un puntero de control.
 * @param {ProcessorState} state - El parámetro "estado" es un objeto que representa el estado actual
 * de un procesador. Contiene información como la instrucción actual que se está ejecutando, el
 * registro de instrucciones (IR), el punto de control (CP) y cualquier otro dato relevante necesario
 * para procesar instrucciones.
 * @param {string[]} instructions - El parámetro `instrucciones` es una matriz de cadenas que
 * representa una secuencia de instrucciones a ejecutar. Cada cadena de la matriz representa una
 * instrucción individual.
 */
async function moveInstructions(state: ProcessorState, instructions: string[]) {
  for (let index = 0; index < instructions.length; index++) {
    const instruction = instructions[index];
    await moveToIR(state, instruction);
    await moveToRecord(state, instruction);
    await incrementCP(state);
  }
}

/**
 * La función incrementa el valor de la propiedad CP en el objeto ProcessorState.
 * @param state - El parámetro "estado" es el estado actual del procesador. Contiene información sobre
 * el estado actual del procesador, como los valores de los registros, la memoria y otros datos
 * relevantes.
 */
const incrementCP: Mutation<ProcessorState> = async (state) => {
  const incrementCPInstruction = "add CP 1";
  await moveToRecord(state, incrementCPInstruction);
};

/**
 * La función `moveToIR` actualiza el estado del procesador para mover una instrucción al Registro de
 * Instrucciones (IR).
 * @param state - El parámetro "estado" representa el estado actual del procesador. Es un objeto que
 * contiene varias propiedades y valores que definen el estado del procesador.
 * @param instruction - El parámetro `instrucción` es el valor que debe moverse al Registro de
 * instrucciones (IR) en la función `moveToIR`.
 */
const moveToIR: Mutation<ProcessorState> = async (state, instruction) => {
  state.isBusEnabled = true;
  state.busMessage = `Moviendo al IR\n${instruction}`;

  await new Promise((resolve) => setTimeout(resolve, state.cycleTime));
  state.isBusEnabled = false;

  Vue.set(state.processorRecords, "IR", {
    addressType: "directo",
    value: instruction,
  });
};

/**
 * La función `moveToRecord` es una función de mutación que toma un `estado` y una `instrucción` y
 * realiza diferentes operaciones basadas en el `operandCode` proporcionado en la instrucción.
 * @param state - El parámetro "estado" representa el estado actual del procesador. Es de tipo
 * `ProcessorState`.
 * @param instruction - El parámetro `instrucción` es una cadena que representa una instrucción en un
 * procesador. Se espera que tenga el formato "operandCode operandOne operandTwo", donde `operandCode`
 * es un código que representa la operación que se va a realizar (por ejemplo, "mov", "add", "sub", "
 * @returns En este código, si alguna de las variables `operandCode`, `operandOne` o `operandTwo` es
 * falsa (es decir, `indefinida`, `null`, `false`, `0`, `""` o `NaN `), entonces no se devuelve nada.
 */
const moveToRecord: Mutation<ProcessorState> = async (state, instruction) => {
  const instructionKeys = instruction.split(" ");
  const operandCode = instructionKeys[0];
  const operandOne = instructionKeys[1];
  const operandTwo = instructionKeys[2];

  if (!operandCode || !operandOne || !operandTwo) return;

  switch (operandCode) {
    case "mov":
      await mov(state, {
        operandOne: operandOne,
        operandTwo: operandTwo,
      });
      break;
    case "add":
    case "sub":
    case "mul":
    case "div":
      await sendToALU(state, {
        operandCode: operandCode,
        operandOne: operandOne,
        operandTwo: operandTwo,
      });
    default:
      break;
  }
};

/**
 * La función `sendToALU` es una función TypeScript que toma un objeto `ProcessorState` y un conjunto
 * de operandos, verifica si el operando es una dirección de memoria válida o un código especial y
 * luego ejecuta la acción apropiada.
 * @param state - El estado actual del procesador.
 * @param  - - `estado`: El estado actual del procesador.
 */
const sendToALU: Mutation<ProcessorState> = async (
  state,
  { operandCode, operandOne, operandTwo }
) => {
  const regex = /(\d+)/;
  const memoryAddress = operandOne.match(regex);

  if (AVAILABLES_RECORDS[operandOne] || operandOne === "CP") {
    await sendWithoutMemoryAddress(state, {
      operandCode: operandCode,
      operandOne: operandOne,
      operandTwo: operandTwo,
    });
  }

  if (memoryAddress && memoryAddress[0]) {
    await sendWithMemoryAddress(state, {
      operandOne: operandOne,
      operandTwo: operandTwo,
    });
  }

  await execute(state);
};

/**
 * La función `sendWithoutMemoryAddress` es una mutación de TypeScript que actualiza el estado de un
 * procesador moviendo datos a la ALU y actualizando varias propiedades según los operandos
 * proporcionados.
 * @param state - El parámetro "estado" representa el estado actual del procesador. Es un objeto que
 * contiene varias propiedades y valores que definen el estado del procesador.
 * @param  - - `estado`: El estado actual del procesador.
 * @returns nada (indefinido) si la condición `if (!operandTwoNumber)` es verdadera. De lo contrario,
 * no tiene una declaración de devolución explícita, por lo que también devolverá un valor indefinido.
 */
const sendWithoutMemoryAddress: Mutation<ProcessorState> = async (
  state,
  { operandCode, operandOne, operandTwo }
) => {
  const operandTwoNumber = parseInt(operandTwo);
  if (!operandTwoNumber) {
    return;
  }

  state.isBusEnabled = true;
  state.busMessage = `Moviendo a la ALU\n ${operandCode} ${operandOne} ${operandTwo}`;

  await new Promise((resolve) => setTimeout(resolve, state.cycleTime));

  state.isBusEnabled = false;

  state.currentRecord = operandOne;
  state.operandCode = operandCode;
  state.operandTwo = operandTwoNumber;
  state.isBusEnabled = false;

  if (operandOne === "CP") {
    state.operandOne = state.processorRecords[operandOne].value;
    return;
  }

  state.operandOne = state.recordData[operandOne].value;
};

/**
 * La función "sendWithMemoryAddress" es una mutación de TypeScript que toma un objeto de estado y dos
 * operandos, pero no tiene ninguna implementación.
 * @param state - El parámetro "estado" representa el estado actual del procesador. Es un objeto que
 * contiene información sobre la memoria, los registros y otros estados internos del procesador.
 * @param  - El parámetro `state` es de tipo `ProcessorState` y representa el estado actual del
 * procesador.
 */
const sendWithMemoryAddress: Mutation<ProcessorState> = async (
  state,
  { operandOne, operandTwo }
) => {};

/**
 * La función `mov` es una función de TypeScript que realiza una mutación en el objeto `ProcessorState`
 * moviendo un valor a un banco de registros.
 * @param state - El parámetro `state` representa el estado actual del objeto `ProcessorState`.
 * Contiene los datos que modificará la función de mutación.
 * @param  - El código anterior define una función de mutación llamada `mov` que toma dos parámetros:
 * `state` y un objeto con propiedades `operandOne` y `operandTwo`.
 * @returns La función de mutación `mov` no devuelve nada explícitamente.
 */
const mov: Mutation<ProcessorState> = async (
  state,
  { operandOne, operandTwo }
) => {
  const OP2IsNumber = parseInt(operandTwo);
  if (OP2IsNumber) {
    await moveToRecordBank(state, { record: operandOne, value: OP2IsNumber });
    return;
  }
};

/**
 * La función `moveToRecordBank` actualiza el valor de un registro en el objeto `recordData` y
 * configura el mensaje del bus en consecuencia.
 * @param state - El parámetro "estado" es un objeto que representa el estado actual del procesador.
 * Contiene varias propiedades que almacenan información sobre el estado del procesador, como
 * `isBusEnabled`, `busMessage`, `cycleTime` y `recordData`.
 * @param  - - `moveToRecordBank` es una función de mutación que toma dos parámetros: `estado` y
 * `{registro, valor}`.
 * @returns La función `moveToRecordBank` devuelve una Promesa.
 */
const moveToRecordBank: Mutation<ProcessorState> = async (
  state,
  { record, value }
) => {
  if (!AVAILABLES_RECORDS[record]) return;
  state.isBusEnabled = true;
  state.busMessage = `Moviendo a ${record} -> ${value}`;

  await new Promise((resolve) => setTimeout(resolve, state.cycleTime));

  Vue.set(state.recordData, record, {
    addressType: "directo",
    value: value,
  });

  state.isBusEnabled = false;
  state.busMessage = "";
};

// ALU
/**
 * Esta función de TypeScript realiza un cálculo basado en el código del operando y actualiza el estado
 * en consecuencia.
 * @param state - El parámetro "estado" es un objeto que representa el estado actual del procesador.
 * Contiene varias propiedades que se utilizan en la ejecución de la mutación.
 */
export const execute: Mutation<ProcessorState> = async (state) => {
  state.isBusEnabled = true;
  state.busMessage = `Moviendo a ${state.currentRecord}`;

  switch (state.operandCode) {
    case "add":
      state.operandResult = state.operandOne + state.operandTwo;
      break;
    case "sub":
      state.operandResult = state.operandOne - state.operandTwo;
      break;
    case "mul":
      state.operandResult = state.operandOne * state.operandTwo;
      break;
    case "div":
      state.operandResult = state.operandOne / state.operandTwo;
      break;
  }

  await new Promise((resolve) => setTimeout(resolve, state.cycleTime));

  state.isBusEnabled = false;
  if (state.currentRecord === "CP") {
    Vue.set(state.processorRecords, state.currentRecord, {
      addressType: "directo",
      value: state.operandResult,
    });
  } else {
    Vue.set(state.recordData, state.currentRecord, {
      addressType: "directo",
      value: state.operandResult,
    });
  }
};
