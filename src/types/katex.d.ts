export {};

declare global {
  interface Window {
    katex?: {
      render: (
        tex: string,
        element: HTMLElement,
        options?: {
          throwOnError?: boolean;
          displayMode?: boolean;
          strict?: boolean | string;
        }
      ) => void;
      renderToString: (tex: string, options?: Record<string, unknown>) => string;
    };
  }
}
