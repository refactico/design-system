import { newSpecPage, SpecPage } from "@stencil/core/testing";
import { RTabs } from "./r-tabs";
import { RTabItem } from "../r-tab-item/r-tab-item";
import { RTabPane } from "../r-tab-pane/r-tab-pane";

describe("r-tabs", () => {
  let page: SpecPage;

  // ==================== RENDERING TESTS ====================
  describe("rendering", () => {
    it("should render with default props", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs>
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
            <r-tab-pane name="tab2" label="Tab 2">Content 2</r-tab-pane>
          </r-tabs>
        `,
      });

      const tabs = page.root.querySelector(".r-tabs");
      expect(tabs).not.toBeNull();
    });

    it("should render header", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs>
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
          </r-tabs>
        `,
      });

      const header = page.root.querySelector(".r-tabs__header");
      expect(header).not.toBeNull();
    });

    it("should render nav", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs>
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
          </r-tabs>
        `,
      });

      const nav = page.root.querySelector(".r-tabs__nav");
      expect(nav).not.toBeNull();
    });

    it("should render content area", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs>
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
          </r-tabs>
        `,
      });

      const content = page.root.querySelector(".r-tabs__content");
      expect(content).not.toBeNull();
    });

    it("should render tab items", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs>
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
            <r-tab-pane name="tab2" label="Tab 2">Content 2</r-tab-pane>
          </r-tabs>
        `,
      });

      await page.waitForChanges();

      const tabItems = page.root.querySelectorAll("r-tab-item");
      expect(tabItems.length).toBe(2);
    });
  });

  // ==================== TYPE TESTS ====================
  describe("types", () => {
    it("should render line type by default", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs>
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
          </r-tabs>
        `,
      });

      const tabs = page.root.querySelector(".r-tabs");
      expect(tabs.classList.contains("r-tabs--line")).toBe(true);
    });

    it("should render card type", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs type="card">
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
          </r-tabs>
        `,
      });

      const tabs = page.root.querySelector(".r-tabs");
      expect(tabs.classList.contains("r-tabs--card")).toBe(true);
    });

    it("should render border-card type", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs type="border-card">
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
          </r-tabs>
        `,
      });

      const tabs = page.root.querySelector(".r-tabs");
      expect(tabs.classList.contains("r-tabs--border-card")).toBe(true);
    });
  });

  // ==================== POSITION TESTS ====================
  describe("tab position", () => {
    it("should render top position by default", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs>
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
          </r-tabs>
        `,
      });

      const tabs = page.root.querySelector(".r-tabs");
      expect(tabs.classList.contains("r-tabs--top")).toBe(true);
    });

    it("should render bottom position", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs tab-position="bottom">
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
          </r-tabs>
        `,
      });

      const tabs = page.root.querySelector(".r-tabs");
      expect(tabs.classList.contains("r-tabs--bottom")).toBe(true);
    });

    it("should render left position", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs tab-position="left">
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
          </r-tabs>
        `,
      });

      const tabs = page.root.querySelector(".r-tabs");
      expect(tabs.classList.contains("r-tabs--left")).toBe(true);
    });

    it("should render right position", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs tab-position="right">
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
          </r-tabs>
        `,
      });

      const tabs = page.root.querySelector(".r-tabs");
      expect(tabs.classList.contains("r-tabs--right")).toBe(true);
    });
  });

  // ==================== ACTIVE TAB TESTS ====================
  describe("active tab", () => {
    it("should activate first tab by default", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs>
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
            <r-tab-pane name="tab2" label="Tab 2">Content 2</r-tab-pane>
          </r-tabs>
        `,
      });

      await page.waitForChanges();

      expect(page.rootInstance.value).toBe("tab1");
    });

    it("should activate specified tab", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs value="tab2">
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
            <r-tab-pane name="tab2" label="Tab 2">Content 2</r-tab-pane>
          </r-tabs>
        `,
      });

      await page.waitForChanges();

      expect(page.rootInstance.value).toBe("tab2");
    });

    it("should change active tab on click", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs>
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
            <r-tab-pane name="tab2" label="Tab 2">Content 2</r-tab-pane>
          </r-tabs>
        `,
      });

      await page.waitForChanges();

      const tabItems = page.root.querySelectorAll("r-tab-item");
      (tabItems[1] as HTMLElement).click();

      await page.waitForChanges();

      expect(page.rootInstance.value).toBe("tab2");
    });
  });

  // ==================== KEYBOARD NAVIGATION TESTS ====================
  describe("keyboard navigation", () => {
    it("should move horizontally with arrow keys", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs>
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
            <r-tab-pane name="tab2" label="Tab 2">Content 2</r-tab-pane>
            <r-tab-pane name="tab3" label="Tab 3">Content 3</r-tab-pane>
          </r-tabs>
        `,
      });

      await page.waitForChanges();

      const nav = page.root.querySelector(".r-tabs__nav");
      nav.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
      await page.waitForChanges();
      expect(page.rootInstance.value).toBe("tab2");

      nav.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
      await page.waitForChanges();
      expect(page.rootInstance.value).toBe("tab1");
    });

    it("should move vertically with arrow keys", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs tab-position="left">
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
            <r-tab-pane name="tab2" label="Tab 2">Content 2</r-tab-pane>
          </r-tabs>
        `,
      });

      await page.waitForChanges();

      const nav = page.root.querySelector(".r-tabs__nav");
      nav.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
      await page.waitForChanges();
      expect(page.rootInstance.value).toBe("tab2");

      nav.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
      await page.waitForChanges();
      expect(page.rootInstance.value).toBe("tab1");
    });

    it("should skip disabled tabs and support Home/End", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs>
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
            <r-tab-pane name="tab2" label="Tab 2" disabled>Content 2</r-tab-pane>
            <r-tab-pane name="tab3" label="Tab 3">Content 3</r-tab-pane>
          </r-tabs>
        `,
      });

      await page.waitForChanges();

      const nav = page.root.querySelector(".r-tabs__nav");

      nav.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
      await page.waitForChanges();
      expect(page.rootInstance.value).toBe("tab3"); // tab2 skipped

      nav.dispatchEvent(new KeyboardEvent("keydown", { key: "Home" }));
      await page.waitForChanges();
      expect(page.rootInstance.value).toBe("tab1");

      nav.dispatchEvent(new KeyboardEvent("keydown", { key: "End" }));
      await page.waitForChanges();
      expect(page.rootInstance.value).toBe("tab3");
    });
  });

  // ==================== STRETCH TESTS ====================
  describe("stretch", () => {
    it("should not stretch by default", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs>
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
          </r-tabs>
        `,
      });

      const tabs = page.root.querySelector(".r-tabs");
      expect(tabs.classList.contains("r-tabs--stretch")).toBe(false);
    });

    it("should stretch when enabled", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs stretch>
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
          </r-tabs>
        `,
      });

      const tabs = page.root.querySelector(".r-tabs");
      expect(tabs.classList.contains("r-tabs--stretch")).toBe(true);
    });
  });

  // ==================== CLOSABLE TESTS ====================
  describe("closable", () => {
    it("should not be closable by default", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs>
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
          </r-tabs>
        `,
      });

      await page.waitForChanges();

      const closeBtn = page.root.querySelector(".r-tab-item__close");
      expect(closeBtn).toBeNull();
    });

    it("should be closable when enabled", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs closable>
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
          </r-tabs>
        `,
      });

      await page.waitForChanges();

      const closeBtn = page.root.querySelector(".r-tab-item__close");
      expect(closeBtn).not.toBeNull();
    });

    it("should emit tabRemove event on close", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs closable>
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
          </r-tabs>
        `,
      });

      await page.waitForChanges();

      const removeSpy = jest.fn();
      page.root.addEventListener("tabRemove", removeSpy);

      const closeBtn = page.root.querySelector(
        ".r-tab-item__close"
      ) as HTMLElement;
      closeBtn.click();

      await page.waitForChanges();

      expect(removeSpy).toHaveBeenCalled();
      expect(removeSpy.mock.calls[0][0].detail).toBe("tab1");
    });
  });

  // ==================== ADDABLE TESTS ====================
  describe("addable", () => {
    it("should not show add button by default", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs>
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
          </r-tabs>
        `,
      });

      const extra = page.root.querySelector(".r-tabs__extra");
      expect(extra).toBeNull();
    });

    it("should show add button when addable", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs addable>
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
          </r-tabs>
        `,
      });

      const extra = page.root.querySelector(".r-tabs__extra");
      expect(extra).not.toBeNull();
    });

    it("should emit tabAdd event on add click", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs addable>
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
          </r-tabs>
        `,
      });

      const addSpy = jest.fn();
      page.root.addEventListener("tabAdd", addSpy);

      const addBtn = page.root.querySelector(
        ".r-tabs__extra r-button"
      ) as HTMLElement;
      addBtn.click();

      await page.waitForChanges();

      expect(addSpy).toHaveBeenCalled();
    });
  });

  // ==================== DISABLED TAB TESTS ====================
  describe("disabled tab", () => {
    it("should not activate disabled tab on click", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs>
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
            <r-tab-pane name="tab2" label="Tab 2" disabled>Content 2</r-tab-pane>
          </r-tabs>
        `,
      });

      await page.waitForChanges();

      const tabItems = page.root.querySelectorAll("r-tab-item");
      (tabItems[1] as HTMLElement).click();

      await page.waitForChanges();

      expect(page.rootInstance.value).toBe("tab1");
    });
  });

  // ==================== EVENT TESTS ====================
  describe("events", () => {
    it("should emit tabChange event on tab change", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs>
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
            <r-tab-pane name="tab2" label="Tab 2">Content 2</r-tab-pane>
          </r-tabs>
        `,
      });

      await page.waitForChanges();

      const changeSpy = jest.fn();
      page.root.addEventListener("tabChange", changeSpy);

      const tabItems = page.root.querySelectorAll("r-tab-item");
      (tabItems[1] as HTMLElement).click();

      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalled();
      expect(changeSpy.mock.calls[0][0].detail).toBe("tab2");
    });
  });

  // ==================== ACTIVE BAR TESTS ====================
  describe("active bar", () => {
    it("should render active bar for line type", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs type="line">
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
          </r-tabs>
        `,
      });

      await page.waitForChanges();

      const activeBar = page.root.querySelector(".r-tabs__active-bar");
      expect(activeBar).not.toBeNull();
    });

    it("should not render active bar for card type", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs type="card">
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
          </r-tabs>
        `,
      });

      await page.waitForChanges();

      const activeBar = page.root.querySelector(".r-tabs__active-bar");
      expect(activeBar).toBeNull();
    });
  });

  // ==================== EXTRA SLOT TESTS ====================
  describe("extra slot", () => {
    it("should render extra slot", async () => {
      page = await newSpecPage({
        components: [RTabs, RTabItem, RTabPane],
        html: `
          <r-tabs>
            <r-tab-pane name="tab1" label="Tab 1">Content 1</r-tab-pane>
            <button slot="extra">Extra Button</button>
          </r-tabs>
        `,
      });

      const extraSlot = page.root.querySelector('[slot="extra"]');
      expect(extraSlot).not.toBeNull();
      expect(extraSlot.textContent).toBe("Extra Button");
    });
  });
});
