const FORMAT_DATE = new Intl.DateTimeFormat('en-GB',{
    dateStyle : 'short',
    timeStyle: "short",

})
export function FormatDate(date : Date){
    return FORMAT_DATE.format(date)
}