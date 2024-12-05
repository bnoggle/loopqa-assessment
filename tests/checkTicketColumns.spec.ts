import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { testUsers } from '../testdata/testUsers';
import { TicketsPage } from '../pages/ticketsPage';
import { testMobileTickets, testWebTickets } from '../testdata/testTickets';



test.beforeEach(async ({ page }) => {
  await page.goto('/');
  const loginPage = new LoginPage(page);
  const ticketsPage = new TicketsPage(page);
  await loginPage.login(testUsers.validUser.username, testUsers.validUser.password);
  await ticketsPage.verifyTabHeading('Web Application');
});

test('Check Web Application Tickets', async ({ page }) => {

  const ticketsPage =  new TicketsPage(page);
  const cardsinJSON = await ticketsPage.gatherCardsToJson();
  console.log(JSON.stringify(cardsinJSON, null, 2));

  Object.entries(testWebTickets).forEach(([key, testCase]) => {
    console.log(`Testing: ${key}`);
    ticketsPage.findCardInColumn(cardsinJSON, testCase.card.title, testCase.column);
    ticketsPage.verifyCardTags(cardsinJSON, testCase.card.title, testCase.card.tags);
    });

});

test('Check Mobile Application Tickets', async ({ page }) => {

  const ticketsPage =  new TicketsPage(page);
  await ticketsPage.clickMobileSidebarNav();
  await ticketsPage.verifyTabHeading('Mobile Application');
  const cardsinJSON = await ticketsPage.gatherCardsToJson();
  
  console.log(JSON.stringify(cardsinJSON, null, 2));
  Object.entries(testMobileTickets).forEach(([key, testCase]) => {
    console.log(`Testing: ${key}`);
    ticketsPage.findCardInColumn(cardsinJSON, testCase.card.title, testCase.column);
    ticketsPage.verifyCardTags(cardsinJSON, testCase.card.title, testCase.card.tags);
    });
  
  
});
