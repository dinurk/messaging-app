const date = new Date();

const timeFormatOptions = {
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false
};

export function log(messageText) {
    const date = new Date();
    const dateString = date.toLocaleDateString("uk-Uk");
    const timeString = new Intl.DateTimeFormat("uk-Uk", timeFormatOptions).format(date); 

    const message = `${dateString} | ${timeString} | ${messageText}`;
    console.log(message);
}