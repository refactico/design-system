import { newSpecPage, SpecPage } from "@stencil/core/testing";
import { RRadio } from "./r-radio";

describe("r-radio", () => {
  let page: SpecPage;

  // ==================== RENDERING TESTS ====================
  describe("rendering", () => {
    it("should render with default props", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: "<r-radio>Option</r-radio>",
      });

      const radio = page.root.querySelector(".r-radio");
      expect(radio).not.toBeNull();
      expect(radio.tagName.toLowerCase()).toBe("label");
    });

    it("should render radio input", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: "<r-radio>Option</r-radio>",
      });

      const input = page.root.querySelector(".r-radio__original");
      expect(input).not.toBeNull();
      expect(input.getAttribute("type")).toBe("radio");
    });

    it("should render radio inner", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: "<r-radio>Option</r-radio>",
      });

      const inner = page.root.querySelector(".r-radio__inner");
      expect(inner).not.toBeNull();
    });

    it("should render label text via prop", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: '<r-radio label="My Label"></r-radio>',
      });

      const label = page.root.querySelector(".r-radio__label");
      expect(label.textContent).toBe("My Label");
    });

    it("should render slot content", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: "<r-radio>Slot Content</r-radio>",
      });

      const label = page.root.querySelector(".r-radio__label");
      expect(label.textContent).toContain("Slot Content");
    });
  });

  // ==================== CHECKED STATE TESTS ====================
  describe("checked state", () => {
    it("should not be checked by default", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: "<r-radio>Option</r-radio>",
      });

      const radio = page.root.querySelector(".r-radio");
      expect(radio.classList.contains("r-radio--checked")).toBe(false);

      const input = page.root.querySelector(
        ".r-radio__original"
      ) as HTMLInputElement;
      expect(input.checked).toBe(false);
    });

    it("should be checked when checked prop is true", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: "<r-radio checked>Option</r-radio>",
      });

      const radio = page.root.querySelector(".r-radio");
      expect(radio.classList.contains("r-radio--checked")).toBe(true);

      const input = page.root.querySelector(
        ".r-radio__original"
      ) as HTMLInputElement;
      expect(input.checked).toBe(true);
    });

    it("should check on click when not checked", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: "<r-radio>Option</r-radio>",
      });

      const label = page.root.querySelector(".r-radio") as HTMLElement;
      label.click();

      await page.waitForChanges();

      expect(page.rootInstance.checked).toBe(true);
    });

    it("should stay checked when already checked and clicked", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: "<r-radio checked>Option</r-radio>",
      });

      const label = page.root.querySelector(".r-radio") as HTMLElement;
      label.click();

      await page.waitForChanges();

      // Radio buttons don't uncheck on click
      expect(page.rootInstance.checked).toBe(true);
    });
  });

  // ==================== DISABLED STATE TESTS ====================
  describe("disabled state", () => {
    it("should render disabled state", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: "<r-radio disabled>Option</r-radio>",
      });

      const radio = page.root.querySelector(".r-radio");
      expect(radio.classList.contains("r-radio--disabled")).toBe(true);

      const input = page.root.querySelector(
        ".r-radio__original"
      ) as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });

    it("should not check when disabled", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: "<r-radio disabled>Option</r-radio>",
      });

      const label = page.root.querySelector(".r-radio") as HTMLElement;
      label.click();

      await page.waitForChanges();

      expect(page.rootInstance.checked).toBe(false);
    });
  });

  // ==================== KEYBOARD INTERACTION TESTS ====================
  describe("keyboard interaction", () => {
    it("should check on Space/Enter", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: "<r-radio>Option</r-radio>",
      });

      const input = page.root.querySelector(
        ".r-radio__original"
      ) as HTMLElement;

      input.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
      await page.waitForChanges();
      expect(page.rootInstance.checked).toBe(true);

      // Radio stays checked; Enter should not uncheck
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
      await page.waitForChanges();
      expect(page.rootInstance.checked).toBe(true);
    });

    it("should ignore keyboard when disabled", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: "<r-radio disabled>Option</r-radio>",
      });

      const input = page.root.querySelector(
        ".r-radio__original"
      ) as HTMLElement;
      input.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
      await page.waitForChanges();
      expect(page.rootInstance.checked).toBe(false);
    });
  });

  // ==================== SIZE TESTS ====================
  describe("sizes", () => {
    it("should render default size", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: "<r-radio>Option</r-radio>",
      });

      const radio = page.root.querySelector(".r-radio");
      expect(radio.classList.contains("r-radio--large")).toBe(false);
      expect(radio.classList.contains("r-radio--small")).toBe(false);
    });

    it("should render large size", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: '<r-radio size="large">Option</r-radio>',
      });

      const radio = page.root.querySelector(".r-radio");
      expect(radio.classList.contains("r-radio--large")).toBe(true);
    });

    it("should render small size", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: '<r-radio size="small">Option</r-radio>',
      });

      const radio = page.root.querySelector(".r-radio");
      expect(radio.classList.contains("r-radio--small")).toBe(true);
    });
  });

  // ==================== BORDER TESTS ====================
  describe("border", () => {
    it("should not have border by default", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: "<r-radio>Option</r-radio>",
      });

      const radio = page.root.querySelector(".r-radio");
      expect(radio.classList.contains("r-radio--border")).toBe(false);
    });

    it("should render with border", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: "<r-radio border>Option</r-radio>",
      });

      const radio = page.root.querySelector(".r-radio");
      expect(radio.classList.contains("r-radio--border")).toBe(true);
    });
  });

  // ==================== VALUE TESTS ====================
  describe("value", () => {
    it("should set value attribute", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: '<r-radio value="option1">Option 1</r-radio>',
      });

      const input = page.root.querySelector(".r-radio__original");
      expect(input.getAttribute("value")).toBe("option1");
    });

    it("should handle numeric value", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: '<r-radio value="123">Option</r-radio>',
      });

      const input = page.root.querySelector(".r-radio__original");
      expect(input.getAttribute("value")).toBe("123");
    });
  });

  // ==================== NAME TESTS ====================
  describe("name", () => {
    it("should set name attribute", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: '<r-radio name="gender">Male</r-radio>',
      });

      const input = page.root.querySelector(".r-radio__original");
      expect(input.getAttribute("name")).toBe("gender");
    });
  });

  // ==================== EVENT TESTS ====================
  describe("events", () => {
    it("should emit change event when checked", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: '<r-radio value="option1">Option</r-radio>',
      });

      const changeSpy = jest.fn();
      page.root.addEventListener("change", changeSpy);

      const label = page.root.querySelector(".r-radio") as HTMLElement;
      label.click();

      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy.mock.calls[0][0].detail).toBe("option1");
    });

    it("should bubble change event", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: '<div id="parent"><r-radio value="opt">Option</r-radio></div>',
      });

      const changeSpy = jest.fn();
      page.body.querySelector("#parent").addEventListener("change", changeSpy);

      const label = page.root.querySelector(".r-radio") as HTMLElement;
      label.click();

      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalled();
    });
  });

  // ==================== KEYBOARD TESTS ====================
  describe("keyboard interaction", () => {
    it("should check on Space key", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: "<r-radio>Option</r-radio>",
      });

      const input = page.root.querySelector(
        ".r-radio__original"
      ) as HTMLInputElement;
      input.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));

      await page.waitForChanges();

      expect(page.rootInstance.checked).toBe(true);
    });

    it("should check on Enter key", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: "<r-radio>Option</r-radio>",
      });

      const input = page.root.querySelector(
        ".r-radio__original"
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
        components: [RRadio],
        html: "<r-radio>Option</r-radio>",
      });

      const input = page.root.querySelector(
        ".r-radio__original"
      ) as HTMLInputElement;
      input.dispatchEvent(new FocusEvent("focus"));

      await page.waitForChanges();

      const radio = page.root.querySelector(".r-radio");
      expect(radio.classList.contains("r-radio--focused")).toBe(true);
    });

    it("should remove focused class on blur", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: "<r-radio>Option</r-radio>",
      });

      const input = page.root.querySelector(
        ".r-radio__original"
      ) as HTMLInputElement;
      input.dispatchEvent(new FocusEvent("focus"));
      await page.waitForChanges();

      input.dispatchEvent(new FocusEvent("blur"));
      await page.waitForChanges();

      const radio = page.root.querySelector(".r-radio");
      expect(radio.classList.contains("r-radio--focused")).toBe(false);
    });
  });

  // ==================== ACCESSIBILITY TESTS ====================
  describe("accessibility", () => {
    it("should have input element for keyboard interaction", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: "<r-radio>Option</r-radio>",
      });

      const input = page.root.querySelector(
        ".r-radio__original"
      ) as HTMLInputElement;
      expect(input).not.toBeNull();
      expect(input.type).toBe("radio");
    });

    it("should have proper label association", async () => {
      page = await newSpecPage({
        components: [RRadio],
        html: "<r-radio>Option</r-radio>",
      });

      const label = page.root.querySelector(".r-radio");
      expect(label.tagName.toLowerCase()).toBe("label");

      const input = page.root.querySelector(".r-radio__original");
      expect(input).not.toBeNull();
    });
  });
});
