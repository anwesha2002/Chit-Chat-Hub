const FORMAT_DATE = new Intl.DateTimeFormat(undefined,{
    dateStyle : 'short',
    timeStyle: "short",

})

export function FormatDate(date : Date){
    return FORMAT_DATE.format(date)
}