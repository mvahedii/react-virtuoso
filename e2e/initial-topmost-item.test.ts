import { test, expect } from '@playwright/test'

test.describe('jagged list with initial topmost item', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:1234/initial-topmost-item')
    await page.waitForSelector('#test-root > div:last-child')
    await page.waitForTimeout(100)
  })

  // the real position here would be 1500, but the calc is based on the
  // first item size, which is 20px
  test('scrolls to the correct position', async ({ page }) => {
    const scrollTop = await page.evaluate(() => {
      const listContainer = document.querySelector('#test-root > div:last-child')
      return listContainer!.scrollTop
    })

    expect(scrollTop).toBe(1200)

    const paddingTop = await page.evaluate(() => {
      const listContainer = document.querySelector('#test-root > div:last-child > div > div') as HTMLElement
      return listContainer.style.paddingTop
    })

    expect(paddingTop).toBe('1200px')
  })

  test('sticks the item to the top', async ({ page }) => {
    const firstChildIndex = await page.evaluate(() => {
      const firstChild = document.querySelector('#test-root > div:last-child > div > div > div') as HTMLElement
      return firstChild.dataset['index']
    })

    expect(firstChildIndex).toBe('60')
  })

  test('sticks the item to the bottom', async ({ page }) => {
    await page.click('#initial-end-80')

    await page.waitForTimeout(100)

    const scrollTop = await page.evaluate(() => {
      const listContainer = document.querySelector('#test-root > div:last-child')
      return listContainer!.scrollTop
    })

    expect(Math.ceil(scrollTop)).toBe(1390)

    const paddingTop = await page.evaluate(() => {
      const listContainer = document.querySelector('#test-root > div:last-child > div > div') as HTMLElement
      return listContainer.style.paddingTop
    })

    expect(paddingTop).toBe('1390px')

    const lastChildIndex = await page.evaluate(() => {
      const lastChildIndex = document.querySelector('#test-root > div > div > div > div:last-child') as HTMLElement
      return lastChildIndex.dataset['index']
    })

    expect(lastChildIndex).toBe('80')
  })
})
