<a href="https://gitmoji.dev">
  <img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square" alt="Gitmoji">
</a>

# 토이 프로젝트 - StudyPot

스터디를 찾고있다면? -> 스터디팟!

## :green_book: Table of Contents

- [Skills](#pushpin-skills)
- [Usage](#pencil2-usage)
- [APIs](#triangular_ruler-apis)

## :pushpin: Skills

### Backend

- Java
- Spring Boot, Spring Data JPA
- JUnit5, Mockito
- Gradle
- Git
- IntelliJ
- MySQL

### Collaboration

- Confluence, JIRA
- Slack

## :pencil2: Usage

1. application.yml 수정 후 사용하는 방법

현재 환경 변수로 설정되어 있는 변수 목록입니다.

```yml
spring:
  datasource:
    url: jdbc:mysql://${mysql.hostServer}:3306/${mysql.databaseName}?serverTimezone=UTC&characterEncoding=UTF-8&validationQuery="select 1"
    username: ${MYSQL_USERNAME}
    password: ${MYSQL_PASSWORD}

jwt:
  secret: ${JWT_SECRET}
  jwtExpirationTimeMs: ${JWT_ACCESS_EXPIRATION_TIME}
  refreshExpirationTimeMs: ${JWT_REFRESH_EXPIRATION_TIME}

logging:
  slack:
    webhook-uri: ${WEBHOOK_URI}

cloud:
  aws:
    credentials:
      accessKey: ${AWS_ACCESSKEY}
      secretKey: ${AWS_SECRETKEY}
    s3:
      bucket: ${AWS_BUCKET_NAME}

mysql:
  hostServer: ${MYSQL_HOST}
  databaseName: ${MYSQL_DB}
```

- MYSQL_USERNAME:

  MySQL 에 접속하기 위한 username 을 설정하는 변수입니다.


- MYSQL_PASSWORD:

  MySQL 에 접속하기 위한 비밀번호를 설정하는 변수입니다.


- JWT_SECRET:

  JWT 토큰의 시크릿 키를 설정하는 변수입니다. 알고리즘으로 HS256을 사용하였기에 32자 이상의 character 를 사용해야 합니다. 32자 미만의 키를 사용할 경우 WeakKeyException 에러가 발생합니다.


- JWT_ACCESS_EXPIRATION_TIME:

  JWT 액세스 토큰의 만료 시간을 설정하는 변수입니다. 단위는 밀리세컨드입니다.


- JWT_REFRESH_EXPIRATION_TIME:

  JWT 리프레시 토큰의 만료 시간을 설정하는 변수입니다. 단위는 마찬가지로 밀리세컨드입니다.


- WEBHOOK_URI:

  에러 로그를 슬랙으로 받아오는 API 의 URI 를 설정하는 변수입니다. 해당 API 를 사용하는 방법은 [Spring 로그를 슬랙으로](https://bum752.github.io/posts/logback-slack-appender/) 를 참고해주세요. 주석으로
  처리해도 실행하는 데에는 문제가 없습니다.


- AWS_ACCESSKEY:

  썸네일 또는 프로필 사진을 저장하기 위한 AWS S3 액세스 키를 설정하는 변수입니다. 액세스 키를 발급받는 방법은 [SpringBoot & AWS S3 연동하기](https://jojoldu.tistory.com/300) 을 참고해주세요.


- AWS_SECRETKEY:

  썸네일 또는 프로필 사진을 저장하기 위한 AWS S3 시크릿 키를 설정하는 변수입니다. 발급 받는 방법은 위와 같습니다.


- AWS_BUCKET_NAME:

  S3 버킷의 이름을 설정하는 변수입니다. 발급 받는 방법은 위와 같습니다.


- MYSQL_HOST:

  사용하는 MySQL 의 호스트를 설정하는 변수입니다.


- MYSQL_DB:

  사용하는 MySQL 의 DB 이름을 설정하는 변수입니다.

해당 yaml 파일에 적절한 변수값을 입력하거나 IDE 의 환경 설정에 값을 입력한 뒤 application 을 실행할 수 있습니다.

2. jar 파일 생성 후 사용하는 방법

```
~/StudyPot/back$ ./gradlew clean
~/StudyPot/back$ ./gradlew bootjar
```

먼저 생성된 jar 파일을 없애기 위해 clean 을 실행한 뒤 bootjar 를 통해 jar 파일을 생성합니다.

이후 java -jar ./build/libs/back-0.0.1-SNAPSHOT.jar 명령어에 위의 환경 변수 설정을 -D 옵션으로 추가하여 실행합니다.

예시)

```linux
java -jar -DAWS_ACCESSKEY=... -DAWS_SECRETKEY=... ./build/libs/back-0.0.1-SNAPSHOT.jar
```

## :triangular_ruler: APIs

### 페이지네이션

일반적인 페이징 처리가 아닌 무한 스크롤을 이용하였습니다.

인터페이스 Pageable 을 RequestParams 로 사용하는 대신 Pageable 을 상속받은 PageRequest 를 새로 만들었습니다.

그리고 PageRequest 만들 때 넣을 size 와 무한 스크롤의 마지막을 알려줄 lastId 를 request parameter 로 받았습니다.

[페이지네이션 관련 클래스](https://github.com/leo0842/StudyPot/blob/develop/back/src/main/java/com/studypot/back/applications/SessionService.java)

### UserId 어노테이션

모든 컨트롤러에서 jwt 토큰으로 만든 Authentication 을 파라미터로 받고 Authentication 의 claim 을 받는 로직을 구현하는 대신

Resolver 를 커스텀하고 UserId 라는 어노테이션을 만들어 파라미터로 받았습니다.

코드가 간결해지고 역할을 분담할 수 있었습니다.

[UserId 어노테이션 관련 클래스](https://github.com/leo0842/StudyPot/blob/develop/back/src/main/java/com/studypot/back/auth/AuthResolver.java)

### 에러 로그 슬랙으로 받기

프론트 서버와 에러에 대해 의사소통하면서 터미널의 에러 로그를 지속적으로 확인하기 힘들었습니다.

따라서 에러가 발생할 때마다 확인하기 위해 Slack 으로 받아볼 수 있게 설정을 변경하였습니다.

[에러 로그 슬랙 설정 관련 파일](https://github.com/leo0842/StudyPot/blob/develop/back/src/main/resources/logback-slack.xml)