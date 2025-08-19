import os
from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Get the absolute path to the project directory
    project_root = os.path.abspath('.')

    # 1. Verify Homepage
    page.goto(f'file://{project_root}/index.html')
    expect(page).to_have_title("Sunday School Stories")
    page.screenshot(path="jules-scratch/verification/01_homepage.png")

    # 2. Navigate to Stories page and verify
    # Use a more specific locator to target the nav link
    page.locator('.nav-menu').get_by_role("link", name="Stories").click()
    expect(page).to_have_title("Stories - Sunday School Stories")
    page.wait_for_selector('.story-card') # Wait for stories to be rendered
    page.screenshot(path="jules-scratch/verification/02_stories_page_all.png")

    # 3. Verify Filter functionality
    page.get_by_role("button", name="Parables").click()
    expect(page.locator('.story-card')).to_have_count(2)
    page.screenshot(path="jules-scratch/verification/03_stories_page_filtered.png")

    # 4. Verify Search functionality
    page.get_by_placeholder("Search for a story...").fill("shepherd")
    expect(page.locator('.story-card')).to_have_count(1)
    expect(page.locator('.story-card h3')).to_have_text("The Good Shepherd")
    page.screenshot(path="jules-scratch/verification/04_stories_page_searched.png")

    # 5. Navigate to Story Detail page and verify
    page.get_by_role("link", name="The Good Shepherd").click()
    expect(page).to_have_title("The Good Shepherd - Sunday School Stories")
    expect(page.locator('h1')).to_have_text("The Good Shepherd")
    page.screenshot(path="jules-scratch/verification/05_story_detail_page.png")

    browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)

print("Verification script executed successfully. Screenshots saved in jules-scratch/verification/")
