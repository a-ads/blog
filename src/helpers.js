export const getURLParamValue = (param, url) => {
  return new URL(url).searchParams.get(param)
}
