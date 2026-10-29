async (page) => {
 const report = {};
 report.technologyFilter = await page.getByRole('tab', {name:'Languages',exact:true}).getAttribute('aria-selected');
 const more = page.getByRole('region', {name:'More projects',exact:true});
 await more.scrollIntoViewIfNeeded();
 report.moreLayout = await more.evaluate(el=>({clientWidth:el.clientWidth,scrollWidth:el.scrollWidth,overflowX:getComputedStyle(el).overflowX,cards:el.querySelectorAll('article').length}));
 await page.screenshot({path:'output/playwright/reference-more-mobile.png'});
 await page.getByRole('button',{name:'Explore PETPAL',exact:true}).click();
 report.modal = await page.getByRole('dialog').evaluate(el=>({tag:el.tagName,open:el.open,width:Math.round(el.getBoundingClientRect().width),viewport:innerWidth,initialFocus:document.activeElement?.getAttribute('aria-label')}));
 await page.screenshot({path:'output/playwright/reference-dialog-mobile.png'});
 await page.keyboard.press('Escape');
 report.focusAfterEscape = await page.evaluate(()=>document.activeElement?.getAttribute('aria-label'));
 report.dialogClosed = await page.getByRole('dialog').count()===0;
 return report;
}
