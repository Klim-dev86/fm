import { state } from '../main/state.js'

export const greetUser = () => {
    if (state.username) {
        console.log(`Welcome to the File Manager, ${state.username}!`)
    } else {
        console.log('Welcome to the File Manager!')
    }
};

export const byeUser = () => {
    if (state.username) {
        console.log(`Thank you for using File Manager, ${state.username}!`)
    } else {
        console.log('Thank you for using File Manager')
    }
};

export const currentDir = () => {
    console.log(`You are currently in ${state.currentDirectory}`)
};

export const invalidInput = () => {
    console.log('Invalid input')
};

export const operationFailed = () => {
    console.log('Operation failed')
};