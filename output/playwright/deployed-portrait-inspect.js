async(page)=>{
await page.setViewportSize({width:1440,height:900});
const response=await page.goto('https://henryalicoben.com/');
const policy=response.headers()['content-security-policy'];
const before=await page.evaluate(()=>({media:matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches,reduced:matchMedia('(prefers-reduced-motion: reduce)').matches,frame:document.querySelector('.hero-portrait')?.outerHTML,atlas:document.querySelector('.portrait-atlas')?.currentSrc,computed:document.querySelector('.portrait-atlas')?{left:getComputedStyle(document.querySelector('.portrait-atlas')).left,top:getComputedStyle(document.querySelector('.portrait-atlas')).top}:null}));
const rect=await page.locator('.hero-portrait').boundingBox();
const poses=[];
for(const [dx,dy] of [[-120,0],[120,0],[0,-120],[0,120]]){
await page.mouse.move(rect.x+rect.width/2+dx,rect.y+rect.height/2+dy);
await page.waitForTimeout(150);
poses.push(await page.locator('.hero-portrait').evaluate(el=>({direction:el.dataset.direction,vars:el.querySelector('.portrait-viewport').getAttribute('style'),left:getComputedStyle(el.querySelector('.portrait-atlas')).left,top:getComputedStyle(el.querySelector('.portrait-atlas')).top})));
}
await page.screenshot({path:'output/playwright/deployed-portrait-before.png'});
return {policy,before,poses};
}
