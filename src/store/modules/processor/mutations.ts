import type { Mutation } from "vuex";
import { ProcessorState } from "./state";
import { AVAILABLES_PROCESSOR_RECORDS as AVAILABLES_RECORDS } from "@/config/constants";
import Vue from "vue";

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

async function moveInstructions(state: ProcessorState, instructions: string[]) {
  for (let index = 0; index < instructions.length; index++) {
    const instruction = instructions[index];
    await moveToIR(state, instruction);
    await moveToRecord(state, instruction);
    await incrementCP(state);
  }
}

const incrementCP: Mutation<ProcessorState> = async (state) => {
  const incrementCPInstruction = "add CP 1";
  await moveToRecord(state, incrementCPInstruction);
};

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

const sendWithMemoryAddress: Mutation<ProcessorState> = async (
  state,
  { operandOne, operandTwo }
) => {};

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
