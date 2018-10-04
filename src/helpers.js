export const getURLParamValue = (param, url) => {
  return new URL(url).searchParams.get(param)
}

export const getCurrentPath = () => {
  const url = new URL(location.href)
  return url.origin + url.pathname
}
