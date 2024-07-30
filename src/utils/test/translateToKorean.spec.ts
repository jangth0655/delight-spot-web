import { translateKindMenu, translateRatingTitle } from '../translateToKorean';

describe('translateKindMenu 단위테스트', () => {
  it("ect 인자를 전달하면 '기타' 단어를 반환한다.", () => {
    expect(translateKindMenu('ect')).toBe('기타');
  });

  it("cafe 인자를 전달하면 '카페' 단어를 반환한다.", () => {
    expect(translateKindMenu('cafe')).toBe('카페');
  });

  it("food 인자를 전달하면 '상점' 단어를 반환한다.", () => {
    expect(translateKindMenu('food')).toBe('상점');
  });
});

describe('translateRatingTitle 단위테스트', () => {
  it("taste_rating을 입력 할 경우 '맛' 텍스트를 반환한다.", () => {
    expect(translateRatingTitle('taste_rating')).toBe('맛');
  });

  it("atmosphere_rating을 입력 할 경우 '분위기' 텍스트를 반환한다.", () => {
    expect(translateRatingTitle('atmosphere_rating')).toBe('분위기');
  });

  it("kindness_rating을 입력 할 경우 '친절함' 텍스트를 반환한다.", () => {
    expect(translateRatingTitle('kindness_rating')).toBe('친절함');
  });

  it("clean_rating을 입력 할 경우 '깔끔함' 텍스트를 반환한다.", () => {
    expect(translateRatingTitle('clean_rating')).toBe('깔끔함');
  });

  it("parking_rating을 입력 할 경우 '주차 공간' 텍스트를 반환한다.", () => {
    expect(translateRatingTitle('parking_rating')).toBe('주차 공간');
  });
  it("restroom_rating을 입력 할 경우 '화장실' 텍스트를 반환한다.", () => {
    expect(translateRatingTitle('restroom_rating')).toBe('화장실');
  });
});
