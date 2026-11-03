import { describe, expect, it } from 'vitest';

import { getPdfWorkerUrl } from '../src/lib/pdfWorkerUrl';

describe('getPdfWorkerUrl', () => {
  const workerUrl = '/assets/pdf.worker.min-123.mjs';

  it('uses the worker URL unchanged at the site root', () => {
    expect(getPdfWorkerUrl(workerUrl, '')).toBe(workerUrl);
  });

  it('prefixes the worker URL with the deployment root path', () => {
    expect(getPdfWorkerUrl(workerUrl, '/spec_bot')).toBe(
      '/spec_bot/assets/pdf.worker.min-123.mjs'
    );
    expect(getPdfWorkerUrl(workerUrl, '/nested/spec_bot/')).toBe(
      '/nested/spec_bot/assets/pdf.worker.min-123.mjs'
    );
  });

  it('leaves absolute and already-prefixed URLs unchanged', () => {
    expect(
      getPdfWorkerUrl('https://cdn.example.com/worker.mjs', '/spec_bot')
    ).toBe('https://cdn.example.com/worker.mjs');
    expect(getPdfWorkerUrl('//cdn.example.com/worker.mjs', '/spec_bot')).toBe(
      '//cdn.example.com/worker.mjs'
    );
    expect(getPdfWorkerUrl('/spec_bot/assets/worker.mjs', '/spec_bot')).toBe(
      '/spec_bot/assets/worker.mjs'
    );
  });
});
