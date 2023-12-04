export const CYCLE_TIME = 2000;

const MEMORY_CAPACITY = 10;
export const LIMIT_MEMORY_INSTRUCTIONS = MEMORY_CAPACITY / 2;
export const LIMIT_MEMORY_DATA = MEMORY_CAPACITY / 2;

export const AVAILABLES_PROCESSOR_RECORDS: { [key: string]: boolean } = {
  AL: true,
  BL: true,
  CL: true,
  DL: true,
};
