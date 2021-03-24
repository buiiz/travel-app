const getRandomImg = (imagesUrl) => {
  return [...imagesUrl].sort(() => Math.random() - 0.5);
};

const convertFtoC = (temp) => Math.round(((temp - 32) * 5) / 9);

export { getRandomImg, convertFtoC };
