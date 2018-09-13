export const getURLParamValue = (param, url) => {
  return new URL(url).searchParams.get(param)
}

export const getCurrentURL = () => {
  return new URL(location.href)
}
