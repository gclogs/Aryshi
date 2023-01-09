const dateConfig = {
  lang: process.env.LANGUAGE
}

type DateTimeStyleFormat = "full" | "long" | "medium" | "short" | undefined;
type TimeZoneFormat = string | undefined;

const date = {
  now(d: DateTimeStyleFormat, t: DateTimeStyleFormat, tz: TimeZoneFormat) {
   return new Intl.DateTimeFormat(dateConfig.lang, { dateStyle: d, timeStyle: t, timeZone: tz }).format(new Date())
 }
}

export default date;