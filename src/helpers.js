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

// export const getURLOrigin = () => {
//   return new URL(window.location.href).origin
// }

export const isEmailValid = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
