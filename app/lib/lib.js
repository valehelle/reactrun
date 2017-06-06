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

export function TimeNiceFormatter(ms) {
    let date = new Date(ms)
    let time = ''
    if(date.getUTCHours() > 0 && date.getUTCMinutes() > 0 && date.getUTCSeconds() > 0){
        time = date.getUTCHours() + ' hours ' + date.getUTCMinutes() + ' minutes and ' + date.getUTCSeconds() + ' seconds'
    }else if(date.getUTCHours() > 0 && date.getUTCMinutes() > 0){
        time = date.getUTCHours() + ' hours ' + date.getUTCMinutes() + ' minutes and '
    }else if(date.getUTCHours() > 0 && date.getUTCSeconds() > 0){
        time = date.getUTCHours() + ' hours and ' + date.getUTCSeconds() + ' seconds'
    }else if(date.getUTCHours() > 0){
        time = date.getUTCHours() + ' hours '
    }else if(date.getUTCMinutes() > 0 && date.getUTCSeconds() > 0){
        time = date.getUTCMinutes() + ' minutes and ' + date.getSeconds() + ' seconds'
    }else if(date.getUTCMinutes() > 0){
        time = date.getUTCMinutes() + ' minutes'
    }else if (date.getUTCSeconds() > 0){
        time = date.getUTCSeconds() + ' seconds'
    }else {
        time = 'less than a second'
    }
    
    return time
}

export function DateFormatter(date) {
    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
}
export function DateNiceFormatter(date) {
    let months = ['January','February','March','April','May','Jun','July','August','September','October','November','December']
    let days = ['Sunday','Monday','Tuesday','Wendnesday','Thurday','Friday','Saturday']

    return days[date.getDay()] + ' ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()
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
    let days = (ms / (1000*60*60*24))
    days = Math.ceil(days)
    if(days < 0){
        days = 0
    }
    return  days
}

export function daysBetween(sDate, eDate){
    let ms = eDate - sDate
    let days = (ms / (1000*60*60*24))

    return  Math.ceil(days)
}

export function mToKM(m){
    let km = m / 1000;
    return km.toFixed(2)
}

export function getDayWeekFirst(){
    let curr = new Date; // get current date
    let first = curr.getDate() - curr.getDay() // First day is the day of the month - the day of the week
    let firstday = new Date(curr.setDate(first))
    firstday.setHours(0,0,0,0)
    return firstday
}

export function getDayWeekLast(){
    let curr = new Date // get current date
    let lastday = new Date(curr.setDate(curr.getDate()+6))
    lastday.setHours(0,0,0,0)
    return lastday
}

export function getWeekLeft(days){
    let weeks = days/7
    return Math.ceil(weeks)
}

export function addMonths (date, count) {
  if (date && count) {
    var m, d = (date = new Date(+date)).getDate()

    date.setMonth(date.getMonth() + count, 1)
    m = date.getMonth()
    date.setDate(d)
    if (date.getMonth() !== m) date.setDate(0)
  }
  return date
}