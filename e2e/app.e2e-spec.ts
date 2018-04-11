import { NomfoodsPage } from './app.po';

describe('nomfoods App', () => {
  let page: NomfoodsPage;

  beforeEach(() => {
    page = new NomfoodsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
