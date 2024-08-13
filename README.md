<h2 style="text-align: center;">Delight Spot 👩‍💻 🧑‍💻</h2>
<p style="text-align: center;">나만의 맛집과 즐거운 장소를 친구나 지인들에게 공유하는 플랫폼입니다.</p>

<br />

## 목차

- [개요](#개요)
- [기능](#기능)
- [프로젝트를 통해 쌓은 경험](#프로젝트를-통해-쌓은-경험)
- [기술 스택](#기술-스택)
- [미래 계획](#미래-계획)

<br />

## 개요

- **프로젝트 이름**: Delight Spot
- **프로젝트 기간**: 2024년 6월 ~ 2024년 8월
- **목적**:
  - 나만의 관심사를 주변 지인들과 간편하게 공유할 수 있는 서비스 제공.
  - **성능 최적화** 및 **테스트 코드 적용**을 통한 안정성 향상 학습.
- **참여 인원**: Back-End 1명, Front-End 1명 (본인)

<br />

## 기능

<details>
<summary>기능 GIF 보기</summary>

- 카카오 로그인
- 스토어 CRUD
- 리뷰 CRUD (평점)
- 스토어 찜(Booking)하기
- 나의 찜목록 확인과 찜목록 제거

<p style="text-align: center;">
  <img src="https://delight-spot.s3.ap-northeast-2.amazonaws.com/%E1%84%86%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%91%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%8C%E1%85%B5.gif" alt="mypage" width="500" height="auto">
  <img src="https://delight-spot.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%8B%E1%85%A5%E1%84%89%E1%85%A2%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC.gif" alt="createStore" width="500" height="auto">
  <img src="https://delight-spot.s3.ap-northeast-2.amazonaws.com/%E1%84%8C%E1%85%A9%E1%84%92%E1%85%AC_%E1%84%85%E1%85%B5%E1%84%87%E1%85%B2.gif" alt="read_review" width="500" height="auto">
</p>

</details>

<br />

## 프로젝트를 통해 쌓은 경험

- **테스트 코드와 CI 자동화**:

  - `Jest`와 `React Testing Library`를 사용하여 주요 기능에 대한 유닛 테스트와 통합 테스트를 작성했습니다. 이를 통해 기능이 의도한 대로 작동하는지 검증하고, 코드의 안정성을 확보했습니다.
  - `GitHub Actions`를 사용해 CI 파이프라인을 구축하여, 모든 Pull Request에서 자동으로 테스트가 실행되도록 설정했습니다. 이 자동화된 테스트 프로세스는 코드 품질을 지속적으로 유지하고, 새로운 기능 추가 시 발생할 수 있는 잠재적인 문제를 조기에 발견하는 데 기여했습니다.
  - 리팩토링 시 테스트 코드를 통해 변경된 코드가 기존 기능에 미치는 영향을 신속하게 확인할 수 있어, 안전하게 코드를 개선하고 유지할 수 있었습니다.

- [성능 최적화](https://jangth0655.github.io/jangth/blog/react-project-performance):

  - 이미지 파일 형식을 `WebP`에서 더 최적화된 `AVIF`로 변환하고, `sizes` 속성을 적용하여 다양한 해상도와 네트워크 환경에 맞게 이미지 로딩 시간을 단축했습니다.
  - 동적 스크립트 로딩을 구현하여 필요 시점에만 스크립트를 로드함으로써 초기 로딩 시간을 줄였습니다.
  - 서버사이드 데이터 페칭을 활용해 초기 콘텐츠 로딩 시간을 단축하고, 사용자 경험을 향상시켰습니다.

  **최적화 결과**:

  - **LCP(최대 콘텐츠 색인 시간)**:

    - 성능 탭에서 LCP는 **5.65초에서 3.09초로 개선**되었습니다 (3G, 캐시 비활성화 환경에서 측정).
    - Lighthouse에서 LCP는 **0.9초에서 0.6초로** 단축되었습니다.

<br />

## 기술 스택

<p>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Zustand-764ABC?style=for-the-badge&logo=zustand&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tanstack%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white"/>
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
  <img src="https://img.shields.io/badge/RTL-E33332?style=for-the-badge&logo=testing-library&logoColor=white"/>
  <img src="https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white"/>
  <img src="https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=for-the-badge&logo=react-hook-form&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
</p>

<br />

## 미래 계획

- **E2E 테스트 도입**:

  - 실제 브라우저 환경에서 API 호출과 전체 사용자 흐름을 검증하기 위해 E2E(End-to-End) 테스트를 도입할 계획입니다.

- **스토리북(Storybook) 통합**:
  - 디자인 시스템을 체계적으로 관리하고, UI 컴포넌트 개발을 효율화하기 위해 **스토리북(Storybook)**을 프로젝트에 통합할 계획입니다.
