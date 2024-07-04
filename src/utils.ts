export function joinIdsArrayToString(ids: string[]) {
  return ids.join(',');
}

export function generateQueryParametersString(params: Record<string, string | number | boolean | undefined>): string {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, String(value));
    }
  });

  return queryParams.toString() ? `?${queryParams.toString()}` : '';
}

export default joinIdsArrayToString;
