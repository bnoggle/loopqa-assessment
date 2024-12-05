import { Page, expect } from '@playwright/test';

export class TicketsPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }


  private mainPanelHeading = '.text-xl.font-semibold.text-gray-900';
  private webApplicationSidebarNav = '//h2[normalize-space(text())="Web Application"]';
  private mobileApplicationSidebarNav = '//h2[normalize-space(text())="Mobile Application"]';
  private columnTitleLocator = '.font-semibold.text-gray-700.mb-4.px-2';
  private cardTitleLocator = '.font-medium.text-gray-900.mb-2';


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GUI Interaction

// Click Mobile Application in sidebar and verify heading displays
public async clickMobileSidebarNav(){
    await this.page.click(this.mobileApplicationSidebarNav);
    await this.verifyTabHeading('Mobile Application');
}

// Click Web Application in sidebar and verify heading displays
public async clickWebSidebarNav(){
    await this.page.click(this.webApplicationSidebarNav);
    await this.verifyTabHeading('Web Application');

}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Verify Methods 

  // Verify that the tickets page/tab heading displays the expected text (such as Web Application / Mobile Application)
  public async verifyTabHeading(expectedHeading: string){

    const elementLocator = this.page.locator(this.mainPanelHeading);
    const text = await elementLocator.innerText();
    console.log(`Expected text = ${expectedHeading}; found text = ${text}`);
    if(expectedHeading != text){
        console.log("Does not match!");
        return false;
    }
    console.log('Heading matches expected');
  } // verifyTabHeading

  // Checks the JSON to ensure that the card (by title) is a child of the column (by heading)
  public async findCardInColumn(data: any[], cardTitle: string, columnTitle: string){

    console.log(`Looking for "${cardTitle}" card in "${columnTitle}" column`);// in \n${data}`);
    const column = data.find((col) => col.title.startsWith(columnTitle));
    if (!column) {
        throw new Error(`Column titled "${columnTitle}" not found.`);
    }
    
    const card = column.cards.find((card) => card.title === cardTitle);
    if (!card) {
        throw new Error(`Card titled "${cardTitle}" not found in column "${columnTitle}".`);
    }

    console.log(`Card "${cardTitle}" found in column "${columnTitle}".`);
  }

  // Checks the JSON list of cards to verify tags in card (selected by title) match passed expectations
  async verifyCardTags(data: any[], cardTitle: string, expectedTags: string[]): Promise<void> {
    let cardFound: Card | null = null; // Explicitly define type
  
    for (const column of data) {
      const card = column.cards.find((card: Card) => card.title === cardTitle);
      if (card) {
        cardFound = card;
        break;
      }
    }
  
    if (!cardFound) {
      throw new Error(`Card titled "${cardTitle}" not found in any column.`);
    }
  
    const actualTags = cardFound.tags; // Now TypeScript knows 'tags' exists
    for (const tag of expectedTags) {
      if (!actualTags.includes(tag)) {
        throw new Error(`Tag "${tag}" not found for card "${cardTitle}".`);
      }
    }
  
    console.log(`Card "${cardTitle}" has all expected tags: ${expectedTags.join(', ')}.`);
  }
  
  

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Data Handling 

  // Scrapes the columns and their child tickets to JSON
  public async gatherCardsToJson(){
    const columns = await this.page.locator('.flex.flex-col.w-80.bg-gray-50.rounded-lg.p-4');
    const result: any[] = []; // Array to hold parsed columns

    for (let i = 0; i < await columns.count(); i++) {
        const column = columns.nth(i);

        const title = await column.locator('.font-semibold.text-gray-700.mb-4.px-2').innerText();
        const activeCardCount = await column.locator('.text-gray-400.text-sm').innerText();

        const cards = await column.locator('.bg-white.p-4.rounded-lg.shadow-sm.border.border-gray-200.hover\\:shadow-md.transition-shadow');
        const parsedCards: any[] = [];

        for (let j = 0; j < await cards.count(); j++) {
        const card = cards.nth(j);

        const cardTitle = await card.locator('.font-medium.text-gray-900.mb-2').innerText();
        const description = await card.locator('.text-sm.text-gray-600.mb-3').innerText();

        const tagParent = card.locator('.flex.flex-wrap.gap-2.mb-3');
        const tags = await tagParent.locator('span.px-2.py-1.rounded-full.text-xs.font-medium').allTextContents();

        const reporter = await card.locator('.flex.items-center.gap-1 span').first().innerText();
        const reportedOn = await card.locator('.flex.items-center.gap-1 span').nth(1).innerText();

        parsedCards.push({
            title: cardTitle,
            description,
            tags,
            reported: { reportedBy: reporter, reportedOn },
        });
        }

        result.push({
        title,
        activeCards: activeCardCount,
        cards: parsedCards,
        });
    }

    return result;
    }

}

// Type definition for Column and Card; could be moved to its own file eventually
type Column = {
    title: string;
    activeCards: string;
    cards: Card[];
  };
  
  type Card = {
    title: string;
    description: string;
    tags: string[];
    reported: {
      reportedBy: string;
      reportedOn: string;
    };
  };
  