export const validateImageUrl = (url) => {
  const regex = /^https?:\/\/.*\.(jpeg|jpg|gif|png)(\?.*)?(#.*)?$/i;
  return regex.test(url);
};
