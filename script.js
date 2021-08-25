#!/usr/bin/env node
const pup = require("puppeteer");

const main = async () => {
    const browser = await pup.launch({
        headless: false,
        defaultViewport: null,
    });
    const pages = await browser.pages();
    const page = pages[0];
    await page.goto(`http://127.0.0.1:5500/index.html`);

    await page.waitForSelector(".snake", { visible: true });
    

    while(true) {

        let snake = await page.$(".snake");
        let food = await page.$(".food");

        let stylefood = await page.evaluate(function (ele) {
            return ele.getAttribute("style");
        }, food);
        let stylesnake = await page.evaluate(function (ele) {
            return ele.getAttribute("style");
        }, snake);

        let xx = stylesnake.split(" ");
        let xx1 = xx[1].split(";");
        let xx3 = xx[3].split(";");
        
        let yy = stylefood.split(" ");
        let yy1 = yy[1].split(";");
        let yy3 = yy[3].split(";");
        
        let snakeX, snakeY, foodX, foodY;
        snakeX =parseInt(xx1[0]);
        snakeY = parseInt(xx3[0]);
        
        foodX = parseInt(yy1[0]);
        foodY = parseInt(yy3[0]);
        
        while(Math.abs(foodY-snakeY)>0) {
            if(foodY>snakeY){
                snakeY += 1;
                await page.keyboard.press("ArrowRight");
            }
            else{
                snakeY -=1;
                await page.keyboard.press("ArrowLeft");
            }
        } 
        while (Math.abs(foodX - snakeX) > 0) {
            if (foodX > snakeX) {
                snakeX += 1;
                await page.keyboard.press("ArrowDown");
            }
            else {
                snakeX -= 1;
                await page.keyboard.press("ArrowUp");
            }
        }   
    }  
    };
main();