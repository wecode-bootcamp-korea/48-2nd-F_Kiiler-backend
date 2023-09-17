# SREAM

## 💻 개발 기간
23.08.21 ~ 23.09.01
## 🧑‍🤝‍🧑 멤버 구성
- 김민수 : ERD모델링, 메인페이지 리스트, 각 신발의 사이즈별 가격 구현
- 최지준 : ERD모델링, 경매 체결 API, 주문 페이지 구현
- 양지은 : 초기설정,PET분석, 회원가입 API, 상세정보 API 
- 홍지수 : 데이터 수집 및 추가, 로그인 API, 상세정보 API
## 🚀서비스 소개

 #### 기획 의도
 한정판을 좋아하는 Z세대들에게 활발한 소비 및 투자로 리셀 스니커즈 시장을 확대하는 서비스를 기획
 
 #### 서비스 개요
 KREAM은 리셀이라는 새로운 소비 트렌드를 캐치한 한정판 스니커즈 거래 중개 서비스로, 단순한 중개에서 벗어나 패션을 즐기는 고객들이 입찰 문화를 통해 소통할 수 있는 플랫폼
 
 #### 핵심 기능
 회원가입
 - 비밀번호 암호화
 - 정규표현식

 로그인
 - 이메일 중복여부 확인
 - 토큰 발급

 메인페이지
 - 쿼리 빌더 사용
 - 정렬, 필터링, 페이징 구현

 상세페이지
 - 상품 정보 및 체결거래, 판매입찰, 구매입찰 데이터 전달

 체결
 - 입찰과 즉시체결
 - transaction으로 rollback 처리
 - 경매 방식 구현

<br />
 
## ⚙️ 기술 스택
### Frontend
[![stackticon](https://firebasestorage.googleapis.com/v0/b/stackticon-81399.appspot.com/o/images%2F1693791891735?alt=media&token=f38ca43a-35de-42fa-8e02-e0b4b0e5efa4)](https://github.com/msdio/stackticon)
### Backend
[![stackticon](https://firebasestorage.googleapis.com/v0/b/stackticon-81399.appspot.com/o/images%2F1693791755671?alt=media&token=2c2c08b5-ef79-4a5a-aa73-582b6c581acf)](https://github.com/msdio/stackticon)
### common
* common : <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"> <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">
* 협업툴 : <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"> <img src="https://img.shields.io/badge/trello-0052CC?style=for-the-badge&logo=trello&logoColor=white"> <img src="https://img.shields.io/badge/postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white">
<br />

## 📌 구현 기능
### Login
![SREAM-로그인](https://github.com/wecode-bootcamp-korea/48-2nd-F_Kiiler-frontend/assets/126768997/1fa0c3fd-92c3-46d6-8a8b-39535b323eae)

[FE] : 실시간 유효성 검사를 통해, 사용자들이 잘못 기입하여 발생할 수 있는 에러를 미연에 방지하였습니다. 인증이 완료된 사용자가 페이지 이동시 매번 로그인하는 수고를 덜 수 있도록, Local Stroage에 토큰을 저장하는 방식 적용하였습니다.

<br>

[BE] : email,password 값이 일치하는 회원정보 제공, 로그인시 JWT(Json Web Token) 발급

<br>


### Sign Up
![SREAM-회원가입](https://github.com/wecode-bootcamp-korea/48-2nd-F_Kiiler-frontend/assets/126768997/37a5c504-64df-4387-add2-8f254bd67d81)

[FE] : 이메일 유효성 검사 구현:
사용자가 제공한 이메일이 올바른 형식인지 확인하기 위해 문자열 메소드를 사용하여 이메일 주소의 유효성을 검사했습니다.
올바르지 않은 이메일 주소를 입력하면 실시간으로 사용자에게 오류 메시지를 표시하여 올바른 형식의 이메일 주소를 입력하도록 유도했습니다.
비밀번호 유효성 검사 구현:
사용자가 생성한 비밀번호가 8~15자리인지 확인하는 로직을 개발했습니다.
비밀번호가 요구 사항을 충족하지 않을 경우, 사용자에게 실시간으로 적절한 오류 메시지를 제공하여 비밀번호를 다시 설정하도록 안내했습니다.
필수 동의 체크 구현:
사용자에게 회원 가입 약관 또는 개인 정보 보호 정책과 같은 필수 동의 항목을 제공했습니다.
모든 필수 동의 항목에 동의하지 않으면 회원 가입 버튼이 비활성화되도록 구현했습니다.

<br>

[BE] : email 형식이 올바르고, 비밀번호 길이가 8~15 일때 회원가입 가능, 비밀번호 암호화

<br>


### Sorting
![SREAM-리스트 정렬](https://github.com/wecode-bootcamp-korea/48-2nd-F_Kiiler-frontend/assets/126768997/9df6edd3-f992-4aeb-9fa8-98c773251708)


[FE] : 쿼리스트링을 활용하여 상품 목록을 낮은 가격순과 높은 가격순으로 정렬하는 정렬 기능을 구현했습니다.

<br>

[BE] : 페이지 들어올시 가격이 오름차순으로 정렬, 높은 가격순 선택시 내림차순 정렬

<br>



### Filtering, Pagination


[FE] : 사용자가 원하는 신발 브랜드와 종류 카테고리를 선택하면, 이를 쿼리스트링을 통해 서버로 전달하여 해당 조건에 맞는 상품 목록을 필터링하고, 페이지네이션을 통해 상품을 8개씩 보여주씩 보여지도록 기능을 구현했습니다. 

<br>

[BE] : queyry builder 이용하여 브랜드와 신발 카테고리로 필터 기능, 8개씩 보여주는 paging 설정

<br>


### Product Detail
![SREAM-상세페이지](https://github.com/wecode-bootcamp-korea/48-2nd-F_Kiiler-frontend/assets/126768997/2656b684-bee4-4104-ac49-330dec945e00)


[FE] : 사용자가 선택한 신발 사이즈별로 최근 거래 가격과와 즉시 구매 및 판매 가격을 조회할 수 있도록 하였습니다. 회원들의 거래 내역을 사이즈별 구매 입찰가, 판매 입찰가, 체결 날짜, 수량 등의 정보로 정리하여 표 형태로 조회할 수 있게 하였습니다. 체결 내역표는 로그인을 한 유저만 볼 수 있도록 하여 회원 유입을 유도했습니다.

<br>

[BE] : 각 제품의 모든 사이즈 구매가와 판매가중 낮은 가격 보이게 설정, 체결 거래, 판매 입찰 수량, 구매 입찰 수량 제공 함

<br>


### Purchase & Payment
![SREAM-즉시구매](https://github.com/wecode-bootcamp-korea/48-2nd-F_Kiiler-frontend/assets/126768997/c5ca3bef-f4af-4ccb-97ea-be0edfaec48b)

[FE] : 해당 상품의 사이즈를 선택하면, 제품의 즉시구매와 구매입찰 컴포넌트가 토글버튼으로 각각 보여지며, 즉시구매에서는 백엔드로부터 받아온 상품데이터의 가격을 저장하여 즉시구매하기 버튼을 누를 때 페이지 이동과 함께 가격데이터를 전송하였습니다. 결제에서는 유저의 포인트를 받아와서 사용 포인트를 입력하면 상품 금액에서 차감하여 나머지 금액을 저장하고 결제하기 버튼을 누르면 모달창에 유저의 구매 데이터를 보여주고 홈화면으로 이동하도록 하였습니다.

<br>

[BE] : 제품의 판매,구매 버튼의 각 사이즈 별 가격을 나타내고 클릭 하엿을때 즉시 구매와 구매 입찰을 하면, 포인트를 사용하여 결제를 하게 만들었습니다. 만일 뒤로 가기 버튼을 눌렀을때 결제가 진행 되지 않게 만들어 주었습니다. 

<br>


### Sell & Payment
![SREAM-판매입찰](https://github.com/wecode-bootcamp-korea/48-2nd-F_Kiiler-frontend/assets/126768997/594b2938-1bfd-47aa-8793-679b0fe108ab)


[FE] : 해당 상품의 사이즈를 선택하면, 제품의 즉시판매와 판매입찰 컴포넌트가 토글버튼으로 각각 보여지며, 판매입찰에서는 유저가 입력한 금액을 판매입찰하기 버튼을 누를 때 페이지 이동과 함께 가격데이터를 전송하였습니다. 결제에서는 유저의 포인트를 받아와서 사용 포인트를 입력하면 상품 금액에서 차감하여 나머지 금액을 저장하고 결제하기 버튼을 누르면 모달창에 유저의 구매 데이터를 보여주고 홈화면으로 이동하도록 하였습니다.

<br>

[BE] :제품의 판매,구매 버튼의 각 사이즈 별 가격을 나타내고 클릭 하엿을때 즉시 판매와 판매 입찰을 하면, 포인트를 사용하여 결제를 하게 만들었습니다. 만일 뒤로 가기 버튼을 눌렀을때 결제가 진행 되지 않게 만들어 주었습니다. 

