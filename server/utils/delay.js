import { log } from "./logger.js"

const defaultDelayMilliseconds = 3000; 

async function delay(milliseconds) {

    if(!Number.isInteger(milliseconds)) {

        log(`delay(milliseconds): получено не целочисленное значение milliseconds: ${milliseconds}. Будет применено значение по умолчанию: ${defaultDelayMilliseconds}`);
        milliseconds = defaultDelayMilliseconds; 
    }

    return new Promise(resolve => {
        setTimeout(() => resolve(), milliseconds)
    });
}

export {delay};