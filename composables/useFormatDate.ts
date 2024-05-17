export default function useFormatDate() {
  const i18n = useI18n()

  return function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
    }
    const dateObj = new Date(date)
    return dateObj.toLocaleDateString(i18n.locale.value, options)
  }
}
