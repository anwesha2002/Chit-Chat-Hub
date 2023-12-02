/*const FORMAT_DATE = new Intl.DateTimeFormat('en-GB',{
    timeStyle: "short",
})*/


export function FormatDate(date : number){
    //console.log(date.toString())
    const time = new Date(date * 1000)
    //console.log(time.toLocaleDateString())
    return time.toLocaleTimeString()
}