export const getURLParamValue = (param, url) => {
  return new URL(url).searchParams.get(param)
}

export const getCurrentPath = () => {
  const url = new URL(window.location.href)
  return url.origin + url.pathname
}

export const getCurrentURL = () => {
  return new URL(window.location.href).href
}
