import { useState, useEffect } from 'react';

export function useLocalStorage(key, defaultValue) {
  // Инициализируем состояние: пытаемся достать из памяти или берем дефолт
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);
    return defaultValue;
  });

  // Каждый раз при изменении value — записываем в localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}