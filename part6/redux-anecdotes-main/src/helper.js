export const compareFn = (a, b) => {
  if (a.votes < b.votes) {
    return 1;
  } else if (a.votes > b.votes) {
    return -1;
  } else return 0;
};
