export function extractTime(dateString){
    const date = new Date(dateString);
    const hours = padZero(date.getHours());
    const minuites = padZero(date.getMinutes());
    return `${hours}:${minuites}`;
}

function padZero(number){
    return number.toString().padStart(2, "0");
}