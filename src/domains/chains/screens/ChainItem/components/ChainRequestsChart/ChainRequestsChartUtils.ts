export function formatDate(date: Date) {
  const dateTimeFormatter = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
  });

  return dateTimeFormatter.format(date);
}

export function formatCallsCount(value: any) {
  return value;
}
