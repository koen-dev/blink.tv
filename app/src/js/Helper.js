export const fetchJson = (url, options) => {
  return fetch(url, options)
    .then((res) => res.json())
}

export const sleep = (delay = 0) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}
