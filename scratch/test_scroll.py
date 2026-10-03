import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1400, 'height': 900})
        await page.goto('http://localhost:5173/#/')
        await page.wait_for_timeout(1500)
        
        # Check video
        video_info = await page.evaluate("""() => {
            const v = document.querySelector('video');
            return v ? { src: v.src, paused: v.paused, readyState: v.readyState } : null;
        }""")
        print('Video info:', video_info)
        
        # Test scrolling down
        for y in [0, 900, 1400, 1800, 2200, 2800]:
            await page.evaluate(f'window.scrollTo(0, {y})')
            await page.wait_for_timeout(400)
            res = await page.evaluate("""() => {
                const sec = document.getElementById('collection-section');
                const rSec = sec ? sec.getBoundingClientRect() : null;
                const cards = Array.from(document.querySelectorAll('#collection-section [data-cursor-text="INSPECT"]'));
                const cardRects = cards.map(c => {
                    const r = c.getBoundingClientRect();
                    return { left: Math.round(r.left), top: Math.round(r.top), width: Math.round(r.width), height: Math.round(r.height) };
                });
                return {
                    scrollY: window.scrollY,
                    secTop: rSec ? Math.round(rSec.top) : null,
                    cardCount: cards.length,
                    cardRects: cardRects
                };
            }""")
            print(res)
            await page.screenshot(path=f'scratch/fixed_scroll_{y}.png')
            
        await browser.close()

asyncio.run(main())
