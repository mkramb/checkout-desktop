const requestAsPost = async <T = unknown>(
  url: string,
  headers: Record<string, unknown>,
  data: unknown
): Promise<T> => {
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
  });

  return await result.json();
};

export { requestAsPost };
