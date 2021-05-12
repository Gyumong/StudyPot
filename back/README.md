<a href="https://gitmoji.dev">
  <img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square" alt="Gitmoji">
</a>

# 토이 프로젝트 - StudyPot

스터디를 찾고있다면? -> 스터디팟!

## :green_book: Table of Contents

- [Member](#four_leaf_clover-members)
- [Skills](#pushpin-skills)
- [Usage](#pencil2-usage)
- [Structure](#triangular_ruler-structure)
- [API](#stew-api)

## :four_leaf_clover: Members

### Front 
####
####
### Back
####
####

## :pushpin: Skills
###  Backend
- Java
- Spring Boot, Spring MVC, Spring JPA
- JUnit5, Mockito
- Gradle
- Git
- IntelliJ
###  Collaboration 
- Wiki Confluence
- Slack


## :pencil2: Usage
resource 자원을 깃에 공유하지 않아 현재 환경변수 설정이 담기지 않은 상태입니다.
해당 서버를 실행하기 위해서는 다음을 따라주세요.
1. src/main/resources 파일 안에 application.yml 파일을 생성합니다.
2. application.yml 파일에 yaml 파일 형식에 맞게 jwt.secret, jwt.jwtExpirationTimeMs, jwt.refreshExpirationTimeMs 환경 변수를 설정합니다. <br>
<br>
예시)
   
```yml
jwt:
  secret: YOUR_SECRET_KEY
  jwtExpirationTimeMs: INTEGER
  refreshExpirationTimeMs: INTEGER
```

만료 시간의 단위는 밀리세컨드입니다.
환경 변수 설정이 완료되면 쉘에서 빌드와 실행을 할 수 있습니다.

```
~/StudyPot/back$ ./gradlew build
~/StudyPot/back$ ./gradlew bootRun
```


## :triangular_ruler: Structure
1. Layered Architecture를 기반으로 UI 계층, application 계층, domain 계층 등으로 기본적인 기능들을 나눈 뒤 DTO, Exceptions 등과 같은 패키지들을 추가한 구조입니다.
2. TDD 방식으로 개발하여 오류 검출을 용이하게 하였고 생산성에서 향상된 개발을 할 수 있었습니다.

## :stew: API
### 1. 회원가입
- 특징
    - 암호화된 비밀번호 저장
- 추가 예정
    - SNS 로그인
    - email 인증
### 2. 회원 로그인
- 특징
    - 예외에 대한 Advice 구현
    - JWT AccessToken 및 JWT RefreshToken 발행
### 3. 필터
- 특징
    - 액세스 토큰을 복호화하여 Authentication 전달
- 추가 예정
    - 필터에서의 예외처리 Advice
    - credentials 추가