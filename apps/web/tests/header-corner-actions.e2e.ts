import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { expect, it } from 'vitest'
import { launchWebScaffold } from './scaffold.ts'
import { connectFreshWorkspace, newEnglishPage } from './support.ts'

it('keeps session actions beside the sidebar across the first turn and session switches', async () => {
  const scaffold = await launchWebScaffold({
    replayFixture: fileURLToPath(new URL('../../../snapshots/web/lifecycle-chrome/session.v3.jsonl', import.meta.url)),
    compareReplaySession: false,
    extraInstallAnchors: [fileURLToPath(new URL('./fixtures/plugins/fixture-header-corner/package.json', import.meta.url))],
  })
  try {
    const channel = process.env.PLAYWRIGHT_CHROMIUM_CHANNEL
    const browser = await chromium.launch(channel ? { channel } : {})
    try {
      const page = await newEnglishPage(browser)
      await scaffold.ctx.loader.create({ name: '@fixture/header-corner' })
      await page.goto(scaffold.authenticatedUrl)
      await connectFreshWorkspace(page, scaffold.workspaceCwd)
      const action = page.locator('[data-conversation-header-corner] [data-corner-session]:visible')
      await action.click()
      const first = await action.getAttribute('data-corner-session')
      expect(first).toBeTruthy()
      expect(await action.textContent()).toBe(first)
      await page.locator('[data-sidebar-right-expand]').click()
      await page.locator('[data-sidebar-right-toggle]').click()
      const settled = scaffold.whenTurnSettled()
      const input = page.locator('[data-composer-input]').first()
      await input.fill('Reply with the single word LIGHTHOUSE and stop.')
      await input.press('Enter')
      await settled
      await page.getByText('LIGHTHOUSE', { exact: true }).waitFor()
      expect(await action.count()).toBe(1)
      expect(await action.getAttribute('data-corner-session')).toBe(first)
      await page.getByRole('button', { name: 'New session', exact: true }).last().click()
      await expect.poll(() => action.getAttribute('data-corner-session')).not.toBe(first)
      await action.click()
      expect(await action.textContent()).toBe(await action.getAttribute('data-corner-session'))
    } finally { await browser.close() }
  } finally { await scaffold.close() }
})
