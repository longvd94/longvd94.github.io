import isString from './isString';

export default function trim(value) {
    if (!value || !isString(value)) {
        return value;
    }
    return value.replace(/^\s+|\s+$/gm,'');
  }