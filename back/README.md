<a href="https://gitmoji.dev">
  <img src="https://img.shields.io/badge/gitmoji-%20π%20π-FFDD67.svg?style=flat-square" alt="Gitmoji">
</a>

# ν μ΄ νλ‘μ νΈ - StudyPot

μ€ν°λλ₯Ό μ°Ύκ³ μλ€λ©΄? -> μ€ν°λν!

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

1. application.yml μμ  ν μ¬μ©νλ λ°©λ²

νμ¬ νκ²½ λ³μλ‘ μ€μ λμ΄ μλ λ³μ λͺ©λ‘μλλ€.

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

  MySQL μ μ μνκΈ° μν username μ μ€μ νλ λ³μμλλ€.


- MYSQL_PASSWORD:

  MySQL μ μ μνκΈ° μν λΉλ°λ²νΈλ₯Ό μ€μ νλ λ³μμλλ€.


- JWT_SECRET:

  JWT ν ν°μ μν¬λ¦Ώ ν€λ₯Ό μ€μ νλ λ³μμλλ€. μκ³ λ¦¬μ¦μΌλ‘ HS256μ μ¬μ©νμκΈ°μ 32μ μ΄μμ character λ₯Ό μ¬μ©ν΄μΌ ν©λλ€. 32μ λ―Έλ§μ ν€λ₯Ό μ¬μ©ν  κ²½μ° WeakKeyException μλ¬κ° λ°μν©λλ€.


- JWT_ACCESS_EXPIRATION_TIME:

  JWT μ‘μΈμ€ ν ν°μ λ§λ£ μκ°μ μ€μ νλ λ³μμλλ€. λ¨μλ λ°λ¦¬μΈμ»¨λμλλ€.


- JWT_REFRESH_EXPIRATION_TIME:

  JWT λ¦¬νλ μ ν ν°μ λ§λ£ μκ°μ μ€μ νλ λ³μμλλ€. λ¨μλ λ§μ°¬κ°μ§λ‘ λ°λ¦¬μΈμ»¨λμλλ€.


- WEBHOOK_URI:

  μλ¬ λ‘κ·Έλ₯Ό μ¬λμΌλ‘ λ°μμ€λ API μ URI λ₯Ό μ€μ νλ λ³μμλλ€. ν΄λΉ API λ₯Ό μ¬μ©νλ λ°©λ²μ [Spring λ‘κ·Έλ₯Ό μ¬λμΌλ‘](https://bum752.github.io/posts/logback-slack-appender/) λ₯Ό μ°Έκ³ ν΄μ£ΌμΈμ. μ£ΌμμΌλ‘
  μ²λ¦¬ν΄λ μ€ννλ λ°μλ λ¬Έμ κ° μμ΅λλ€.


- AWS_ACCESSKEY:

  μΈλ€μΌ λλ νλ‘ν μ¬μ§μ μ μ₯νκΈ° μν AWS S3 μ‘μΈμ€ ν€λ₯Ό μ€μ νλ λ³μμλλ€. μ‘μΈμ€ ν€λ₯Ό λ°κΈλ°λ λ°©λ²μ [SpringBoot & AWS S3 μ°λνκΈ°](https://jojoldu.tistory.com/300) μ μ°Έκ³ ν΄μ£ΌμΈμ.


- AWS_SECRETKEY:

  μΈλ€μΌ λλ νλ‘ν μ¬μ§μ μ μ₯νκΈ° μν AWS S3 μν¬λ¦Ώ ν€λ₯Ό μ€μ νλ λ³μμλλ€. λ°κΈ λ°λ λ°©λ²μ μμ κ°μ΅λλ€.


- AWS_BUCKET_NAME:

  S3 λ²ν·μ μ΄λ¦μ μ€μ νλ λ³μμλλ€. λ°κΈ λ°λ λ°©λ²μ μμ κ°μ΅λλ€.


- MYSQL_HOST:

  μ¬μ©νλ MySQL μ νΈμ€νΈλ₯Ό μ€μ νλ λ³μμλλ€.


- MYSQL_DB:

  μ¬μ©νλ MySQL μ DB μ΄λ¦μ μ€μ νλ λ³μμλλ€.

ν΄λΉ yaml νμΌμ μ μ ν λ³μκ°μ μλ ₯νκ±°λ IDE μ νκ²½ μ€μ μ κ°μ μλ ₯ν λ€ application μ μ€νν  μ μμ΅λλ€.

2. jar νμΌ μμ± ν μ¬μ©νλ λ°©λ²

```
~/StudyPot/back$ ./gradlew clean
~/StudyPot/back$ ./gradlew bootjar
```

λ¨Όμ  μμ±λ jar νμΌμ μμ κΈ° μν΄ clean μ μ€νν λ€ bootjar λ₯Ό ν΅ν΄ jar νμΌμ μμ±ν©λλ€.

μ΄ν java -jar ./build/libs/back-0.0.1-SNAPSHOT.jar λͺλ Ήμ΄μ μμ νκ²½ λ³μ μ€μ μ -D μ΅μμΌλ‘ μΆκ°νμ¬ μ€νν©λλ€.

μμ)

```linux
java -jar -DAWS_ACCESSKEY=... -DAWS_SECRETKEY=... ./build/libs/back-0.0.1-SNAPSHOT.jar
```

## :triangular_ruler: APIs

### νμ΄μ§λ€μ΄μ

μΌλ°μ μΈ νμ΄μ§ μ²λ¦¬κ° μλ λ¬΄ν μ€ν¬λ‘€μ μ΄μ©νμμ΅λλ€.

μΈν°νμ΄μ€ Pageable μ RequestParams λ‘ μ¬μ©νλ λμ  Pageable μ μμλ°μ PageRequest λ₯Ό μλ‘ λ§λ€μμ΅λλ€.

κ·Έλ¦¬κ³  PageRequest λ§λ€ λ λ£μ size μ λ¬΄ν μ€ν¬λ‘€μ λ§μ§λ§μ μλ €μ€ lastId λ₯Ό request parameter λ‘ λ°μμ΅λλ€.

[νμ΄μ§λ€μ΄μ κ΄λ ¨ ν΄λμ€](https://github.com/leo0842/StudyPot/blob/develop/back/src/main/java/com/studypot/back/applications/SessionService.java)

### UserId μ΄λΈνμ΄μ

λͺ¨λ  μ»¨νΈλ‘€λ¬μμ jwt ν ν°μΌλ‘ λ§λ  Authentication μ νλΌλ―Έν°λ‘ λ°κ³  Authentication μ claim μ λ°λ λ‘μ§μ κ΅¬ννλ λμ 

Resolver λ₯Ό μ»€μ€ννκ³  UserId λΌλ μ΄λΈνμ΄μμ λ§λ€μ΄ νλΌλ―Έν°λ‘ λ°μμ΅λλ€.

μ½λκ° κ°κ²°ν΄μ§κ³  μ­ν μ λΆλ΄ν  μ μμμ΅λλ€.

[UserId μ΄λΈνμ΄μ κ΄λ ¨ ν΄λμ€](https://github.com/leo0842/StudyPot/blob/develop/back/src/main/java/com/studypot/back/auth/AuthResolver.java)

### μλ¬ λ‘κ·Έ μ¬λμΌλ‘ λ°κΈ°

νλ‘ νΈ μλ²μ μλ¬μ λν΄ μμ¬μν΅νλ©΄μ ν°λ―Έλμ μλ¬ λ‘κ·Έλ₯Ό μ§μμ μΌλ‘ νμΈνκΈ° νλ€μμ΅λλ€.

λ°λΌμ μλ¬κ° λ°μν  λλ§λ€ νμΈνκΈ° μν΄ Slack μΌλ‘ λ°μλ³Ό μ μκ² μ€μ μ λ³κ²½νμμ΅λλ€.

[μλ¬ λ‘κ·Έ μ¬λ μ€μ  κ΄λ ¨ νμΌ](https://github.com/leo0842/StudyPot/blob/develop/back/src/main/resources/logback-slack.xml)