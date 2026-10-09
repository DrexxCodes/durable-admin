/** True once a value has arrived from the backend (0 and "" count as arrived; undefined / null do not). */
export const isSet = v => v !== undefined && v !== null;
