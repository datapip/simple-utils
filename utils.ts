export const pipe = (...funcs: Function[]): Function => {
  return (value: any) => {
    return funcs.reduce((previous: any, func: any) => {
      return func(previous);
    }, value);
  };
};

export const memoize = (func: Function): Function => {
  const cache = <any>{};

  return (...args: any) => {
    const key = args.toString();
    if (key in cache) {
      return cache[key];
    }

    const result = func(...args);
    cache[key] = result;
    return result;
  };
};

export const debounce = (func: Function, delay: number): Function => {
  let timeoutId: any;

  return (...args: any) => {
    window.clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export const log = (...args: any): void => {
  console.log(...args);
};

export const deepCopy = (obj: any): any => {
  if (typeof obj !== "object" || obj === null) return obj;

  const copy = Array.isArray(obj) ? <any>[] : <any>{};

  for (let key in obj) {
    const value = obj[key];
    copy[key] = deepCopy(value);
  }

  return copy;
};

export const isEmpty = (obj: any): boolean | undefined => {
  if (typeof obj !== "object" || obj === null) return;

  if (Array.isArray(obj)) {
    return obj.length === 0;
  } else {
    return Object.keys(obj).length === 0;
  }
};

export const getElement = (selector: string): HTMLElement | null => {
  return document.querySelector(selector);
};

export const createElement = (
  tagName: string,
  className?: string
): HTMLElement => {
  const elem = document.createElement(tagName);
  if (className) elem.classList.add(className);
  return elem;
};

export const addListener = (
  event: keyof HTMLElementEventMap,
  func: any,
  target?: HTMLElement,
  capture = false
): void => {
  (target || document).addEventListener(event, func, !!capture);
};

export const removeListener = (
  event: keyof HTMLElementEventMap,
  func: any,
  target?: HTMLElement,
  capture = false
): void => {
  (target || document).removeEventListener(event, func, !!capture);
};

export const addClass = (
  selector: string,
  className: string,
  scope?: HTMLElement
): void => {
  (scope || document).querySelector(selector)?.classList.add(className);
};

export const removeClass = (
  selector: string,
  className: string,
  scope?: HTMLElement
): void => {
  (scope || document).querySelector(selector)?.classList.remove(className);
};

export const clipboardCopy = (text: string): void => {
  if (navigator?.clipboard?.writeText) {
    navigator.clipboard.writeText(text);
  } else {
    const textArea = createElement("textarea") as HTMLTextAreaElement;
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
};

export const properCase = (text: string): string => {
  return `${text[0].toUpperCase()}${text.slice(1).toLowerCase()}`;
};
