async(page)=>{
await page.emulateMedia({reducedMotion:'reduce'});
await page.waitForTimeout(100);
const rect=await page.locator('.hero-portrait').boundingBox();
await page.mouse.move(rect.x-80,rect.y+rect.height/2);
await page.waitForTimeout(100);
const reduced=await page.evaluate(()=>({direction:document.querySelector('.hero-portrait').dataset.direction,atlas:!!document.querySelector('.portrait-atlas'),reduced:matchMedia('(prefers-reduced-motion:reduce)').matches}));
await page.emulateMedia({reducedMotion:'no-preference'});
const context=await page.context().browser().newContext({viewport:{width:1440,height:900},hasTouch:true});
const hybrid=await context.newPage();
await hybrid.route('https://challenges.cloudflare.com/**',route=>route.fulfill({contentType:'application/javascript',body:''}));
await hybrid.goto('https://henryalicoben.com/');
const box=await hybrid.locator('.hero-portrait').boundingBox();
await hybrid.mouse.move(box.x-70,box.y+box.height/2);
await hybrid.waitForTimeout(150);
const mouseOnCoarse=await hybrid.evaluate(()=>({direction:document.querySelector('.hero-portrait').dataset.direction,atlas:!!document.querySelector('.portrait-atlas'),fine:matchMedia('(pointer:fine)').matches,hover:matchMedia('(hover:hover)').matches}));
await context.close();
return {reduced,mouseOnCoarse};
}
