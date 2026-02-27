import puppeteer from 'puppeteer';

module.exports = {
  /**
   * get the video source of the instagram post/reel
   * @param source instagram URL - https://www.instagram.com/p/C6bkkUbxapP/
   * @returns
   */
  getVideoSource: async (source) => {
    // async function getVideoSource(source) {
    console.log(source);
    if (source.slice(0, 31) != 'https://www.instagram.com/reel/') {
      throw new Error(
        `${source} must follow format https://www.instagram.com/reel/`
      );
    }
    if (source.slice(-6) != '/embed') {
      throw new Error(`${source} must end with /embed`);
    }

    // Launch the browser in headlessmode and open a new page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto(source, { waitUntil: 'networkidle0' });
    console.log(`we opened the page ${source}`);

    //wait for video to load

    // await page.waitForSelector('video');
    // console.log('video has loaded');

    // //wait for img to load
    // await page.waitForSelector('img');
    // console.log('img has loaded');

    //get the video link
    const videoLink = await page.evaluate(() => {
      let img = document.body.querySelector('.EmbeddedMediaImage') ?? null;
      let video = document.body.querySelector('video') ?? null;
      const data = {
        img: img ? img.src : null,
        video: video ? video.src : null,
      };
      return data;
    });

    console.log(videoLink);
    await browser.close();
    return videoLink;
  },
};

// getVideoSource('https://www.instagram.com/reel/Cy0nxlLOZ8G/embed');
