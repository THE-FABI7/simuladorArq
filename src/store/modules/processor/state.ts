export interface ProcessorState {
  cycleTime: number;

  //BUS
  isBusEnabled: boolean;
  busMessage: string;

  //ALU
  operandCode: string;
  operandOne: number;
  operandTwo: number;
  operandResult: number;
  currentRecord: string;

  //Records
  memoryData: { [key: string]: Instruction };
  recordData: { [key: string]: RecordData };
  processorRecords: { [key: string]: RecordData };
}

const defaultState: ProcessorState = {
  cycleTime: 5000,

  // BUS
  isBusEnabled: false,
  busMessage: "",

  // ALU
  operandCode: "",
  operandOne: 0,
  operandTwo: 0,
  operandResult: 0,
  currentRecord: "",

  memoryData: {},

  recordData: {
    AL: { addressType: "", value: 0 },
    BL: { addressType: "", value: 0 },
    CL: { addressType: "", value: 0 },
    DL: { addressType: "", value: 0 },
  },

  processorRecords: {
    MAR: { addressType: "", value: 0 },
    MBR: { addressType: "", value: 0 },
    CP: { addressType: "", value: 0 },
    IR: { addressType: "", value: 0 },
  },
};

export default {
  ...defaultState,
};
