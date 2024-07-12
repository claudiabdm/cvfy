export const useDarkMode = () => {
  const isDark = ref<boolean>(false)

  function toggleDarkMode() {
    isDark.value = !isDark.value

    isDark.value
      ? document.querySelector('body')?.classList.add('dark')
      : document.querySelector('body')?.classList.remove('dark')
    
    process.client && localStorage.setItem(`cvSettings-darkmode`, JSON.stringify(isDark.value))
  }

  if(process.client) {
    const themePreference = localStorage.getItem('cvSettings-darkmode');
    if (themePreference) {
      isDark.value = JSON.parse(themePreference)
      isDark.value
        ? document.querySelector('body')?.classList.add('dark') 
        : document.querySelector('body')?.classList.remove('dark')
    }
  }

  return {
    isDark,
    toggleDarkMode
  }
}
