import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/'); // Зайти на сайт
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверить цвет кнопки "восст пароль"
          });

    afterEach('Конец теста', function () {
            cy.get(result_page.close).should('be.visible'); // Есть крестик, и он виден пользователю
           });

    it('Верные логин и пароль', function () {

         cy.get(main_page.email).type(data.login); // Найти поле "логин" и ввести верный логин
         cy.get(main_page.password).type(data.password); // Найти поле "пароль" и ввести верный пароль
         cy.get(main_page.login_button).click(); // Нажать кнопку войти

         cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверить, что после авторизации виден текст
         cy.get(result_page.title).should('be.visible'); // Текст виден пользователю       
     })

     it('Неверный логин и верный пароль', function () {

        cy.get(main_page.email).type('kotik@mail.ru'); // Найти поле "логин" и ввести НЕверный логин
        cy.get(main_page.password).type(data.password); // Найти поле "пароль" и ввести верный пароль
        cy.get(main_page.login_button).click(); // Нажать кнопку войти

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверить, что после авторизации виден текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю       
    })

     it('Верный логин и неверный пароль', function () {

        cy.get(main_page.email).type(data.login); // Найти поле "логин" и ввести верный логин
        cy.get(main_page.password).type('cypress20'); // Найти поле "пароль" и ввести НЕверный пароль
        cy.get(main_page.login_button).click(); // Нажать кнопку войти

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверить, что после авторизации виден текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю      
    })

    it('Проверка, что в логине есть @', function () {

        cy.get(main_page.email).type('user.login'); // Найти поле "логин" и ввести логин без @
        cy.get(main_page.password).type(data.password); // Найти поле "пароль" и ввести верный пароль
        cy.get(main_page.login_button).click(); // Нажать кнопку войти

        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Проверить, что после авторизации виден текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю   
    })

    it('Проверка восстановления пароля', function () {

        cy.get(main_page.fogot_pass_btn).click(); // Нажать кнопку "забыли пароль?"

        cy.get(recovery_page.email).type(data.login); // Ввести почту для восст. пароля
        cy.get(recovery_page.send_button).click(); // Нажать кнопку "отправить код"

        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Проверить, что после авторизации виден текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю     
    })

 }) 