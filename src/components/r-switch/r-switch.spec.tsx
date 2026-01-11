import { newSpecPage, SpecPage } from "@stencil/core/testing";
import { RSwitch } from "./r-switch";

describe("r-switch", () => {
  let page: SpecPage;

  // ==================== RENDERING TESTS ====================
  describe("rendering", () => {
    it("should render with default props", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: "<r-switch></r-switch>",
      });

      const switchEl = page.root.querySelector(".r-switch");
      expect(switchEl).not.toBeNull();
      expect(switchEl.tagName.toLowerCase()).toBe("label");
    });

    it("should render switch core", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: "<r-switch></r-switch>",
      });

      const core = page.root.querySelector(".r-switch__core");
      expect(core).not.toBeNull();
    });

    it("should render switch thumb", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: "<r-switch></r-switch>",
      });

      const thumb = page.root.querySelector(".r-switch__thumb");
      expect(thumb).not.toBeNull();
    });

    it("should render hidden checkbox input", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: "<r-switch></r-switch>",
      });

      const input = page.root.querySelector(".r-switch__input");
      expect(input).not.toBeNull();
      expect(input.getAttribute("type")).toBe("checkbox");
    });
  });

  // ==================== CHECKED STATE TESTS ====================
  describe("checked state", () => {
    it("should not be checked by default", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: "<r-switch></r-switch>",
      });

      const switchEl = page.root.querySelector(".r-switch");
      expect(switchEl.classList.contains("r-switch--checked")).toBe(false);

      const input = page.root.querySelector(
        ".r-switch__input"
      ) as HTMLInputElement;
      expect(input.checked).toBe(false);
    });

    it("should be checked when checked prop is true", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: "<r-switch checked></r-switch>",
      });

      const switchEl = page.root.querySelector(".r-switch");
      expect(switchEl.classList.contains("r-switch--checked")).toBe(true);

      const input = page.root.querySelector(
        ".r-switch__input"
      ) as HTMLInputElement;
      expect(input.checked).toBe(true);
    });

    it("should toggle checked state on click", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: "<r-switch></r-switch>",
      });

      const label = page.root.querySelector(".r-switch") as HTMLElement;
      label.click();

      await page.waitForChanges();

      expect(page.rootInstance.checked).toBe(true);
    });

    it("should toggle from checked to unchecked", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: "<r-switch checked></r-switch>",
      });

      const label = page.root.querySelector(".r-switch") as HTMLElement;
      label.click();

      await page.waitForChanges();

      expect(page.rootInstance.checked).toBe(false);
    });
  });

  // ==================== DISABLED STATE TESTS ====================
  describe("disabled state", () => {
    it("should render disabled state", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: "<r-switch disabled></r-switch>",
      });

      const switchEl = page.root.querySelector(".r-switch");
      expect(switchEl.classList.contains("r-switch--disabled")).toBe(true);

      const input = page.root.querySelector(
        ".r-switch__input"
      ) as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });

    it("should not toggle when disabled", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: "<r-switch disabled></r-switch>",
      });

      const label = page.root.querySelector(".r-switch") as HTMLElement;
      label.click();

      await page.waitForChanges();

      expect(page.rootInstance.checked).toBe(false);
    });

    it("should not emit change event when disabled", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: "<r-switch disabled></r-switch>",
      });

      const changeSpy = jest.fn();
      page.root.addEventListener("change", changeSpy);

      const label = page.root.querySelector(".r-switch") as HTMLElement;
      label.click();

      expect(changeSpy).not.toHaveBeenCalled();
    });
  });

  // ==================== LOADING STATE TESTS ====================
  describe("loading state", () => {
    it("should render loading state", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: "<r-switch loading></r-switch>",
      });

      const switchEl = page.root.querySelector(".r-switch");
      expect(switchEl.classList.contains("r-switch--loading")).toBe(true);
    });

    it("should not toggle when loading", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: "<r-switch loading></r-switch>",
      });

      const label = page.root.querySelector(".r-switch") as HTMLElement;
      label.click();

      await page.waitForChanges();

      expect(page.rootInstance.checked).toBe(false);
    });

    it("should disable input when loading", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: "<r-switch loading></r-switch>",
      });

      const input = page.root.querySelector(
        ".r-switch__input"
      ) as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });
  });

  // ==================== KEYBOARD INTERACTION TESTS ====================
  describe("keyboard interaction", () => {
    it("should toggle on Space/Enter", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: "<r-switch></r-switch>",
      });

      const input = page.root.querySelector(".r-switch__input") as HTMLElement;

      input.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
      await page.waitForChanges();
      expect(page.rootInstance.checked).toBe(true);

      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
      await page.waitForChanges();
      expect(page.rootInstance.checked).toBe(false);
    });

    it("should ignore keyboard when disabled or loading", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: "<r-switch disabled loading></r-switch>",
      });

      const input = page.root.querySelector(".r-switch__input") as HTMLElement;
      input.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
      await page.waitForChanges();
      expect(page.rootInstance.checked).toBe(false);
    });
  });

  // ==================== SIZE TESTS ====================
  describe("sizes", () => {
    it("should render default size", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: "<r-switch></r-switch>",
      });

      const switchEl = page.root.querySelector(".r-switch");
      expect(switchEl.classList.contains("r-switch--large")).toBe(false);
      expect(switchEl.classList.contains("r-switch--small")).toBe(false);
    });

    it("should render large size", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: '<r-switch size="large"></r-switch>',
      });

      const switchEl = page.root.querySelector(".r-switch");
      expect(switchEl.classList.contains("r-switch--large")).toBe(true);
    });

    it("should render small size", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: '<r-switch size="small"></r-switch>',
      });

      const switchEl = page.root.querySelector(".r-switch");
      expect(switchEl.classList.contains("r-switch--small")).toBe(true);
    });
  });

  // ==================== TEXT LABELS TESTS ====================
  describe("text labels", () => {
    it("should render active text", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: '<r-switch active-text="ON"></r-switch>',
      });

      const label = page.root.querySelector(".r-switch__label");
      expect(label).not.toBeNull();
      expect(label.textContent).toBe("ON");
    });

    it("should render inactive text", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: '<r-switch inactive-text="OFF"></r-switch>',
      });

      const label = page.root.querySelector(".r-switch__label");
      expect(label).not.toBeNull();
      expect(label.textContent).toBe("OFF");
    });

    it("should render both active and inactive text", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: '<r-switch active-text="ON" inactive-text="OFF"></r-switch>',
      });

      const labels = page.root.querySelectorAll(".r-switch__label");
      expect(labels.length).toBe(2);
    });
  });

  // ==================== INLINE PROMPT TESTS ====================
  describe("inline prompt", () => {
    it("should render inline prompt", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: '<r-switch inline-prompt active-text="Y" inactive-text="N"></r-switch>',
      });

      const switchEl = page.root.querySelector(".r-switch");
      expect(switchEl.classList.contains("r-switch--inline-prompt")).toBe(true);

      const activeInner = page.root.querySelector(".r-switch__inner--active");
      const inactiveInner = page.root.querySelector(
        ".r-switch__inner--inactive"
      );

      expect(activeInner).not.toBeNull();
      expect(inactiveInner).not.toBeNull();
    });
  });

  // ==================== CUSTOM COLORS TESTS ====================
  describe("custom colors", () => {
    it("should apply active color", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: '<r-switch active-color="#13ce66"></r-switch>',
      });

      const switchEl = page.root.querySelector(".r-switch") as HTMLElement;
      expect(switchEl.style.getPropertyValue("--r-switch-active-color")).toBe(
        "#13ce66"
      );
      expect(switchEl.classList.contains("r-switch--custom-active")).toBe(true);
    });

    it("should apply inactive color", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: '<r-switch inactive-color="#ff4949"></r-switch>',
      });

      const switchEl = page.root.querySelector(".r-switch") as HTMLElement;
      expect(switchEl.style.getPropertyValue("--r-switch-inactive-color")).toBe(
        "#ff4949"
      );
      expect(switchEl.classList.contains("r-switch--custom-inactive")).toBe(
        true
      );
    });
  });

  // ==================== NAME ATTRIBUTE TESTS ====================
  describe("name attribute", () => {
    it("should set name attribute on input", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: '<r-switch name="notifications"></r-switch>',
      });

      const input = page.root.querySelector(".r-switch__input");
      expect(input.getAttribute("name")).toBe("notifications");
    });
  });

  // ==================== ARIA LABEL TESTS ====================
  describe("aria label", () => {
    it("should set aria-label on input", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: '<r-switch aria-label="Toggle notifications"></r-switch>',
      });

      const input = page.root.querySelector(".r-switch__input");
      expect(input.getAttribute("aria-label")).toBe("Toggle notifications");
    });
  });

  // ==================== EVENT TESTS ====================
  describe("events", () => {
    it("should emit change event when toggled", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: "<r-switch></r-switch>",
      });

      const changeSpy = jest.fn();
      page.root.addEventListener("change", changeSpy);

      const label = page.root.querySelector(".r-switch") as HTMLElement;
      label.click();

      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy.mock.calls[0][0].detail).toBe(true);
    });

    it("should emit change event with false when toggled off", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: "<r-switch checked></r-switch>",
      });

      const changeSpy = jest.fn();
      page.root.addEventListener("change", changeSpy);

      const label = page.root.querySelector(".r-switch") as HTMLElement;
      label.click();

      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy.mock.calls[0][0].detail).toBe(false);
    });

    it("should bubble change event", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: '<div id="parent"><r-switch></r-switch></div>',
      });

      const changeSpy = jest.fn();
      page.body.querySelector("#parent").addEventListener("change", changeSpy);

      const label = page.root.querySelector(".r-switch") as HTMLElement;
      label.click();

      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalled();
    });
  });

  // ==================== KEYBOARD TESTS ====================
  describe("keyboard interaction", () => {
    it("should toggle on Space key", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: "<r-switch></r-switch>",
      });

      const input = page.root.querySelector(
        ".r-switch__input"
      ) as HTMLInputElement;
      input.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));

      await page.waitForChanges();

      expect(page.rootInstance.checked).toBe(true);
    });

    it("should toggle on Enter key", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: "<r-switch></r-switch>",
      });

      const input = page.root.querySelector(
        ".r-switch__input"
      ) as HTMLInputElement;
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

      await page.waitForChanges();

      expect(page.rootInstance.checked).toBe(true);
    });
  });

  // ==================== FOCUS TESTS ====================
  describe("focus state", () => {
    it("should add focused class on focus", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: "<r-switch></r-switch>",
      });

      const input = page.root.querySelector(
        ".r-switch__input"
      ) as HTMLInputElement;
      input.dispatchEvent(new FocusEvent("focus"));

      await page.waitForChanges();

      const switchEl = page.root.querySelector(".r-switch");
      expect(switchEl.classList.contains("r-switch--focused")).toBe(true);
    });

    it("should remove focused class on blur", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: "<r-switch></r-switch>",
      });

      const input = page.root.querySelector(
        ".r-switch__input"
      ) as HTMLInputElement;
      input.dispatchEvent(new FocusEvent("focus"));
      await page.waitForChanges();

      input.dispatchEvent(new FocusEvent("blur"));
      await page.waitForChanges();

      const switchEl = page.root.querySelector(".r-switch");
      expect(switchEl.classList.contains("r-switch--focused")).toBe(false);
    });
  });

  // ==================== ACCESSIBILITY TESTS ====================
  describe("accessibility", () => {
    it("should have input element for keyboard interaction", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: "<r-switch></r-switch>",
      });

      const input = page.root.querySelector(
        ".r-switch__input"
      ) as HTMLInputElement;
      expect(input).not.toBeNull();
      expect(input.type).toBe("checkbox");
    });

    it("should have proper label association", async () => {
      page = await newSpecPage({
        components: [RSwitch],
        html: "<r-switch></r-switch>",
      });

      const label = page.root.querySelector(".r-switch");
      expect(label.tagName.toLowerCase()).toBe("label");

      const input = page.root.querySelector(".r-switch__input");
      expect(input).not.toBeNull();
    });
  });
});
