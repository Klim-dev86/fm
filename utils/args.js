import { state } from '../main/state.js'

export const getUserArgs = () => {
  const args = process.argv.slice(2);

  return args;
};

export const parseArgs = (arg) => {
  let key, value, rest;

  if (arg.includes('=')) {
    [key, value, ...rest] = arg.split('=');
    if (rest.length > 0) {
      throw new Error(`Incorrect format of --key=value pair of argument`)
    }
  }

  switch (key) {
    case '--username':
      state.username = value;
      break
    default:
      console.log(`Unknown type of argument: ${arg}`)
  }
};
