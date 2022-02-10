export class Storage {
  fallbackData = {}

  prefix = ''

  constructor({ prefix } = {}) {
    this.prefix = prefix || '';
  }

  set = (key, value) => {
    try {
      window.localStorage.setItem(`${this.prefix}${key}`, value);
    } catch {
      this.fallbackData[`${this.prefix}${key}`] = value;
    }
  }

  get = (key) => {
    try {
      return window.localStorage.getItem(`${this.prefix}${key}`);
    } catch {
      return this.fallbackData[`${this.prefix}${key}`];
    }
  }

  remove = (key) => {
    try {
      window.localStorage.removeItem(`${this.prefix}${key}`);
    } catch {
      delete this.fallbackData[`${this.prefix}${key}`];
    }
  }
}
