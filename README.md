﻿# 현백 해외브랜드 사이트를 위한 컴포넌트 관리도구
## 설명 
- 코딩 지식 없이도 HTML 템플릿을 운용할 수 있도록 만든 도구.
- 다른 사이트에서도 범용적으로 사용할 수 있도록 설계하였습니다.

## 기술스펙 : 
- frontend : react / react-query / recoil / vite 
- backend : express / apollo-server / graphql

## 개발자 
컴포넌트를 제작하며, 편집 영역에 아래와 같은 방법을 이용합니다.
1. 수정이 필요한 HTML 요소에 data-target-control를 추가
2. [ 이름_수정할타겟 ]을 설정하여 data-target-control에 넣습니다
```
- 예시 : 이미지_src => 이미지 태그의 src 속성을 수정
- 예시 : 텍스트_text => HTML요소 내의 innerText를 수정
- 예시 : 영역_style-text => HTML요소 속성의 style을 수정하고, 요소 내의 innerText를 수정 (-를 이용하면 계속 이어나갈 수 있음)
```
4. 저장을 합니다.

## 비개발자 
원하는 컴포넌트 목록에 들어가서, 수정할 곳에 수정한 후, HTML코드를 복사하여 TIS에 붙입니다.

## 실행방법
1. Clone
2. Clone 이후 client, server 디렉토리를 들어가서 yarn을 실행
3. 아래 명령어를 통해서 client와 server를 각각 터미널에서 실행합니다.
```
- npm run client
- npm run server
```
