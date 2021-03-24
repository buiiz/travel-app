import { convertFtoC, getRandomImg } from '../utils';

describe('utils', () => {
  it('should convert fahrenheit to celsius', () => {
    expect(convertFtoC(55)).toBe(13);
  });
});

describe('utils', () => {
  it('should return an array with all entry values', () => {
    const imgURL = ['url1', 'url2', 'url3', 'url4'];
    expect(getRandomImg(imgURL)).toEqual(expect.arrayContaining(['url1', 'url2', 'url3', 'url4']));
  });

  it('should not match an array with all entry values', () => {
    const imgURL = ['url1', 'url2', 'url3', 'url4'];
    expect(getRandomImg(imgURL)).not.toMatchObject(imgURL);
  });
});
