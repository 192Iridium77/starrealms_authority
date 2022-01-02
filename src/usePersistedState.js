import react from 'react'

export function usePersistedState(defaultValue, key) {
    const storageKey = `star_realms_authority_tracker_${key}`
  const [value, setValue] = react.useState(() => {
    const persistedValue = window.localStorage.getItem(storageKey);
    return persistedValue !== null
      ? JSON.parse(persistedValue)
      : defaultValue;
  });
  react.useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(value));
  }, [storageKey, value]);
  return [value, setValue];
}