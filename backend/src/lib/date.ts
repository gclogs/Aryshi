const Language = process.env.LANGUAGE

export function DateTime(_dateStyle, _timeStyle, _timeZone) {
  return new Intl.DateTimeFormat(Language, { dateStyle: _dateStyle, timeStyle: _timeStyle, timeZone: _timeZone }).format(new Date())
}