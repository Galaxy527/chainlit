export function getPdfWorkerUrl(workerUrl: string, rootPath: string): string {
  const basename = rootPath.replace(/\/$/, '');

  if (
    !basename ||
    !workerUrl.startsWith('/') ||
    workerUrl.startsWith('//') ||
    workerUrl.startsWith(`${basename}/`)
  ) {
    return workerUrl;
  }

  return `${basename}${workerUrl}`;
}
