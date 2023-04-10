# TODO & Emotion Diary

### 실행 스크립티

```
# client
yarn start

# server
yarn server
```

<br>

# 1. /todo

## 데이터구조

```json
{
  "id": 3,
  "createdAt": "2023.4.11",
  "items": [
    {
      "id": "todo3",
      "text": "리팩토링 하기",
      "status": "active"
    },
    {
      "id": "todo4",
      "text": "git commit => mock data로 수정 후 배포!",
      "status": "active"
    },
    {
      "id": "todo5",
      "text": "diary patch, delete",
      "status": "active"
    }
  ]
}
```

## 기능

1. 할 일 추가 (하단의 추가 버튼)
   - 추가하려는 날짜에 items 가 없을 때 ➡️ `post` 요청
   - 추가하려는 날짜에 items 가 있을 때 ➡️ 해당 날짜의 id를 엔드포인트로(`/todo/id`) `patch` 요청
   - 🌟 현재 추가는 오늘날짜만 가능함 입력폼에 달력 아이콘 클릭하면 날짜 수정할 수 있도록 수정하할것
2. 할 일 수정
   - checkBox 클릭시 ➡️ 상태변경(active / done)
   - todo text 클릭시 ➡️ text 변경
   - ➡️ 해당 날짜의 id를 엔드포인트로(/todo/id) `patch` 요청
3. 할 일 삭제 (todo text 클릭시)
   - items의 배열 요소만 삭제해야하므로 `patch` 요청
   - 🌟 items의 배열의 길이가 0일 때 `/todo/id` `delete`
     - 현재 시각적으로 안보이게 해놨으나 제대로 구현 안되어 있음 나중에 수정할 것!
4. 필터
   - All : 오늘이후의 할 일 필터링
   - Today : 오늘의 할 일 필터링
   - 🌟 incomplete : 과거의 할 일들 중 status가 active인 것들이 있을 때 button 표시 클릭시 `/todo/active`로 이동
     - _문제:_ 렌더링은 되지만 update가 되지 않음
     - _원인:_ path가 달라서 함수가 전달 안됨
     - 추후 상태관리라이브러리 등을 이용해서 수정할 것
5. 기타
   - 오늘 날짜에 일기가 있을 때 ➡️ 그 날의 감정 이모티콘 보임 클릭시 `/diary`로 이동
   - 오늘 날짜에 일기가 없을 때 ➡️ 버튼 클릭시 `/diary/crate`로 이동

<br>

# 2. /diary

## 데이터 구조

todo보다 구조가 단순해서 비교적 수월했다. <br>
🌟 `status`부분은 /images/ 부분 제거하고 보낼 수 있도록 수정할 것!

```json
{
  "id": 100,
  "createdAt": "2023.4.1",
  "text": "오늘 떡튀순 먹었다 맛있었다.",
  "status": "/images/happy"
}
```

## 기능

1. 달력 `/diary`
   - 해당 날짜에 일기가 있을 때 ➡️ 그 날의 감정 표시, 클릭시 `/diary/detail/id` 로 이동
   - 해당 날짜에 일기가 없을 때 ➡️ 숫자 표시, 클릭시 `/diary/create` 로 이동 (crate 컴포넌트는 해당 날짜로 state로 받음)
   - 오늘 이후의 날짜는 비활성화 ➡️ 미래에 일기를 쓸 수 없으므로
   - 🌟 해당 월이 아닌 날의 감정이모지가 보임(숫자는 보이지 않음) 수정하기
     - ex. 3월에 4/1의 일기가 보이지 않도록 수정
   - 상단의 년도/월 클릭시 년도와, 월을 이동할 수 있음 (모달)
     - 모달 배경 클릭시 혹은 월 선택시 닫힘
     - 렌더링 되는 달력의 날짜(월)과 현재 날짜(월) 오늘로 돌아갈 수 있는 버튼 활성화
2. 일기 추가 `/diary/create`
   - 달력하단 버튼 혹은 추가하고싶은 날의 일을(숫자) 클릭하면 `/diary/create` 로 이동
   - 🌟 현재 감정 이모지를 선택해야만 다음으로 넘어갈 수 있는데 일기 작성을 그만 두고 싶을 때 `이모지선택 ➡️ 다음 버튼 클릭 ➡️ 뒤로가기 버튼 클릭` 총 3번의 일을 해야해서 불편함 해결 방안 찾아서 수정할것
   - 입력폼에서 시계 아이콘을 클릭하면 `textarea`에 현재 날짜 추가됨
3. 일기 수정 - 🌟 <text style="text-decoration: line-through;">구현 안됨</text>
4. 일기 삭제 - 🌟 <text style="text-decoration: line-through;">구현 안됨</text>
5. 일기리스트 `diary/list` - 🌟 진행중

<br>

# 기타

1. 다크모드
   - 🌟 다크모드일 때 체크 이미지 바꾸기
2. 🌟 splash
   - axios 통신 할 때마나 리로드 되면서 splash도 반복됨
   - 아무래도 json-server의 문제 같음 <text style="text-decoration: line-through;">아닐 수도...ㅎ</text>
   - 처음 렌더링 됐을 때만 실행되도록 `useEffect({},[])` 말고 다른 방법 찾아보기

<br>

# 🌟 추가로 해야할 것

- Not Found / Loading 페이지
- Mock data 로 변경 후 배포하기 (현재 json 서버 사용중)
  - 로컬 스토리지 등 이용하기
- 기능별로 git commit 하기
- 네트워크 통신 부분 반복되는 부분 리팩토링
- 현재 useQuery, useTodoUpdate등 파일이 따로 만들어져 있음 한 파일로 모듈화 하기
- <text style="text-decoration: line-through;">모달 활성화 되었을 때 스크롤 이동 막기 \* 4/7 완료<text>

<br>

# 💕 나중에 하고 싶은 것

- 일기 리스트에서 검색하면 해당 검색어가 있는 일기만 필터링
- 스크롤 달력
- 일기 생성 시 이미지 첨부
