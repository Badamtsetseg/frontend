if ('serviceWorker' in navigator) {
  console.log('prepare install sw')
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    console.log('install sw')
    navigator.serviceWorker.register('/service-worker.js')
  })
}
