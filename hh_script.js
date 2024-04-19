import puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        userDataDir: '/home/gapragapr/projects/puppeteer/1/profile',
        channel: 'chrome',
        args: [`--window-size=1440,1200`],
        defaultViewport: {
          width: 1440,
          height: 1200
        },
        executablePath: '/usr/bin/google-chrome'
    })

    const page = await browser.newPage()

    await page.goto('https://hh.ru/', {
        waitUntil: 'domcontentloaded'
    })

    console.log('Скрипт запущен ' + new Date())

    const searchInput = await page.$('[data-qa=search-input]')

    if (searchInput) {
      await searchInput.type('Frontend')
      await searchInput.press('Enter')
    }

    await page.waitForNavigation({
        waitUntil: 'domcontentloaded'
    })

    const regionCheckbox = await page.$('.novafilters-list__item [data-qa=serp__novafilter-area-177]')

    if (regionCheckbox) {
        await regionCheckbox.click()
    }

    const companyNameCheckbox = await page.$('.novafilters-list__item [data-qa=serp__novafilter-search_field-company_name]')

    if (companyNameCheckbox) {
        await companyNameCheckbox.click()
    }

    await page.waitForNavigation({
        waitUntil: 'domcontentloaded'
    })

    const excludedInput = await page.$('[data-qa=novafilters-excluded-text-input]')

    if (excludedInput) {
        await excludedInput.type('Native, native, C#, C++, Senior, senior, php, PHP, Php')
        await excludedInput.press('Enter')
    }

    await page.waitForNavigation({
      waitUntil: 'domcontentloaded'
    })

    const compensationInput = await page.$("[data-qa=novafilters-custom-compensation]")

    if (compensationInput) {
        await compensationInput.click()
        await compensationInput.type('75000')
        await compensationInput.press('Enter')
    }

    const salaryCheckbox = await page.$('[data-qa=serp__novafilter-only_with_salary]')

    if (salaryCheckbox) {
      await salaryCheckbox.click()
    }

    await page.waitForNavigation({
        waitUntil: 'domcontentloaded'
    })

    await page.evaluate(() => {
        const jobs = document.querySelectorAll(
            ".vacancy-serp-item__layout a.bloko-button"
          );

        jobs.forEach(job => {
            setTimeout(() => {
                job.click()
            }, 500)
            clearTimeout()
        })
    })

    await page.waitForNavigation({
        timeout: 60 * 1000,
        waitUntil: 'domcontentloaded'
    })

    console.log('Скрипт выполнен ' + new Date())

    await browser.close()
})();
