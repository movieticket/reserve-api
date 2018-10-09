# Movieticket Reserve API Application

[![CircleCI](https://circleci.com/gh/movieticket/reserve-api.svg?style=svg)](https://circleci.com/gh/movieticket/reserve-api)

## Table of contents

* [Usage](#usage)
* [License](#license)

## Usage

### Environment variables

| Name                         | Required | Value                     | Purpose                   |
| ---------------------------- | -------- | ------------------------- | ------------------------- |
| `DEBUG`                      | false    | movieticket-reserve-api:* | Debug                     |
| `BASIC_AUTH_NAME`            | false    |                           | ベーシック認証Name        |
| `BASIC_AUTH_PASS`            | false    |                           | ベーシック認証Pass        |
| `MVTK_RESERVE_ENDPOINT`      | true     |                           | ムビチケAPIエンドポイント |
| `TOKEN_ISSUERS`              | true     |                           |                           |
| `RESOURCE_SERVER_IDENTIFIER` | true     |                           |                           |

## License

ISC
