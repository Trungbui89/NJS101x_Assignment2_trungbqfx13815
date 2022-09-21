import moment from "moment"

export const zeroPad = (num, places) => String(num).padStart(places, '0')

export const convertToDMY = (data) => moment(data).format('DD/MM/YYYY')

export const convertToDMYT = (data) => moment(data).format('DD/MM/YYYY, h:mm:ss a')

export const workTime_DMY = (workTime) => {
    if(workTime > 0) {
        const hours = Math.floor(workTime/(60*60*1000))
        const minutes = Math.floor(((workTime - hours*60*60*1000))/(1000*60))
        const seconds = Math.round((workTime - hours*60*60*1000 - minutes*60*1000)/1000)
        const workTimeFomated = `${zeroPad(hours, 2)} giờ ${zeroPad(minutes, 2)} phút ${zeroPad(seconds, 2)} giây`
        return workTimeFomated
    } else {
        return '00 giờ 00 phút 00 giây'
    }
}