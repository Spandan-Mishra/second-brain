
export const hasher = (len: number): string => {
  let options = "1234567890qwertyuiopasdfghjklzxcvbnm";
  let ans = "";

  for (let i = 0; i < len; i++) {
    ans += options[Math.floor(Math.random() * options.length)];
  }

  return ans;
}
