import { MyweathertrendsPage } from './app.po';

describe('myweathertrends App', () => {
  let page: MyweathertrendsPage;

  beforeEach(() => {
    page = new MyweathertrendsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
