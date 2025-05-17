Здравствуйте! Gendiff — это консольное приложение, предназначенное для сравнения двух конфигурационных файлов (в формате JSON, YAML), отображающее различия между ними в удобном и читаемом виде. Утилита разработана в рамках учебного проекта на Хекслете, специализирующегося на подготовке инженеров по автоматизации тестирования.

Проект демонстрирует навыки работы с:

CLI-интерфейсом (Node.js)

Парсингом JSON и YAML

Рекурсивным сравнением данных

Форматированием вывода (stylish, plain, json)

Покрытием кода тестами с использованием Jest

CI/CD (GitHub Actions)

Code coverage и статическим анализом кода через SonarQube

1. Данная аскинема демонстрирует работу сравнения .yaml файлов
https://asciinema.org/a/HznFD8l0m4xByPyDv4ajFCfLM

2. Демонстрация работы плоского формата 
https://asciinema.org/a/IdcBerqEp0o3xWjRxOWo6IAWk

3. Демонстрация вывода в структурированном формате
https://asciinema.org/a/iaaWCaEHllMgQsVlbXUXmJdG4


## Быстрые команды через Makefile

Для удобства в проекте есть Makefile с основными командами:

| Команда          | Описание                     |
|------------------|------------------------------|
| `make install`   | Установить зависимости       |
| `make test`      | Запустить тесты               |
| `make coverage`  | Запустить тесты с покрытием  |
| `make lint`      | Запустить линтер              |
| `make run`       | Запустить утилиту gendiff    |

---

## Использование

```bash
make install
make test
make coverage
make lint
make run -- --help

[![SonarQube Cloud](https://sonarcloud.io/images/project_badges/sonarcloud-light.svg)](https://sonarcloud.io/summary/new_code?id=MoreOcean-maker_qa-auto-engineer-javascript-project-87)
