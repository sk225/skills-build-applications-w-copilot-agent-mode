export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return 'http://localhost:8000/api';
}

export function getApiUrl(path) {
  const normalizedPath = path.replace(/^\/+/, '').replace(/\/+$/, '');
  return `${getApiBaseUrl()}/${normalizedPath}/`;
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (payload?.data && typeof payload.data === 'object') {
    return [payload.data];
  }

  return [];
}
