import * as data from "../helpers/default_data.json"

describe('e2e автотест на сайте покемонов', function () {

    it('e2e автотест для покемонов: на покупку нового аватара для своего тренера', function () {
         cy.visit('https://pokemonbattle.ru/'); // Зайти на сайт

         cy.get(':nth-child(1) > .auth__input').type(data.login_pokemon); //Найти поле "логин" и ввести верный логин
         cy.get('#password').type(data.password_pokemon); // Найти поле "пароль" и ввести верный пароль
         cy.get('.auth__button').click(); // Нажать кнопку "войти"

         cy.wait(2000);

         cy.get('.header__container > .header__id').click(); // Нажать на свой профиль
         cy.get('[href="/shop"]').click(); // Нажать на "смена аватара"
         cy.get('.available > button').first().click({ force: true }); // Нажать на первого доступного аватара
         cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('4620869113632996'); // Ввести номер карты
         cy.get(':nth-child(1) > .pay_base-input-v2').type('1225'); // Ввести срок действия карты
         cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125'); // Ввести код CVV
         cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('KOTIK KOTIKOV'); // Ввести имя владельца карты
         cy.get('.pay-btn').click(); // Нажать на кнопку "оплатить"
         cy.get('#cardnumber').type('56456'); // Ввести код из смс
         cy.get('.payment__submit-button').click(); // Нажать на кнопку "отправить"
         cy.get('.payment__font-for-success').contains('Покупка прошла успешно'); // Проверка на наличие текста после покупки аватара
         cy.get('.payment__font-for-success').should('be.visible'); // Текст виден пользователю
     })
 }) 