export function encryptId(id) {
  const secret = "my-secret-key"; // move to .env if needed
  const str = id.toString() + secret;

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36).substring(0, 8);
}
