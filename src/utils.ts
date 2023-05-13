export function encodeStringArrayToURI(ids: string[]) {
  return encodeURI(ids.join(','));
}

export function generateQueryParametersString(params: Record<string, string | number | boolean | undefined>) {
  let queryParametersString = '';
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined) {
      queryParametersString += `${queryParametersString.length ? '&' : '?'}${key}=${params[key]}`;
    }
  });
  return queryParametersString;
}

export default encodeStringArrayToURI;
