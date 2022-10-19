const regexExp = /^[a-zA-Z1-9]{44}$/;

export const isNearHash = (input: string) => regexExp.test(input.trim());
