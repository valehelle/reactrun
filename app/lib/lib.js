/**
 * Convert milliseconds to time string (hh:mm:ss:mss).
 *
 * @param Number ms
 *
 * @return String
 */
export function TimeFormatter(ms) {
    return new Date(ms).toISOString().slice(11, -5)
}

export function toDate(dateStr) {
    var parts = dateStr.split("-");
    return new Date(parts[2], parts[1] - 1, parts[0])
}

export function getToday(){
    let today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)
}
export function daysLeft(endDate){
    let ms = endDate - getToday()
    return  days = (ms / (1000*60*60*24))
}
export function mToKM(m){
    let km = m / 1000;
    return km.toFixed(2)
}
export function getDate(){
     curr = new Date; // get current date
         first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
         last = first + 6; // last day is the first day + 6

         firstday = new Date(curr.setDate(first)).toUTCString();
         lastday = new Date(curr.setDate(curr.getDate()+6)).toUTCString();
         return(firstday + 'aa' + lastday)
}