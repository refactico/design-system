import { newSpecPage, SpecPage } from "@stencil/core/testing";
import { RCheckbox } from "./r-checkbox";

describe("r-checkbox", () => {
  let page: SpecPage;

  // ==================== RENDERING TESTS ====================
  describe("rendering", () => {
    it("should render with default props", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: "<r-checkbox>Option</r-checkbox>",
      });

      const checkbox = page.root.querySelector(".r-checkbox");
      expect(checkbox).not.toBeNull();
      expect(checkbox.tagName.toLowerCase()).toBe("label");
    });

    it("should render checkbox input", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: "<r-checkbox>Option</r-checkbox>",
      });

      const input = page.root.querySelector(".r-checkbox__original");
      expect(input).not.toBeNull();
      expect(input.getAttribute("type")).toBe("checkbox");
    });

    it("should render checkbox inner", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: "<r-checkbox>Option</r-checkbox>",
      });

      const inner = page.root.querySelector(".r-checkbox__inner");
      expect(inner).not.toBeNull();
    });

    it("should render label text via prop", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: '<r-checkbox label="My Label"></r-checkbox>',
      });

      const label = page.root.querySelector(".r-checkbox__label");
      expect(label.textContent).toBe("My Label");
    });

    it("should render slot content", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: "<r-checkbox>Slot Content</r-checkbox>",
      });

      const label = page.root.querySelector(".r-checkbox__label");
      expect(label.textContent).toContain("Slot Content");
    });

    it("should render checkmark icon", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: "<r-checkbox>Option</r-checkbox>",
      });

      const svg = page.root.querySelector(".r-checkbox__inner svg");
      expect(svg).not.toBeNull();
    });
  });

  // ==================== CHECKED STATE TESTS ====================
  describe("checked state", () => {
    it("should not be checked by default", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: "<r-checkbox>Option</r-checkbox>",
      });

      const checkbox = page.root.querySelector(".r-checkbox");
      expect(checkbox.classList.contains("r-checkbox--checked")).toBe(false);

      const input = page.root.querySelector(
        ".r-checkbox__original"
      ) as HTMLInputElement;
      expect(input.checked).toBe(false);
    });

    it("should be checked when checked prop is true", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: "<r-checkbox checked>Option</r-checkbox>",
      });

      const checkbox = page.root.querySelector(".r-checkbox");
      expect(checkbox.classList.contains("r-checkbox--checked")).toBe(true);

      const input = page.root.querySelector(
        ".r-checkbox__original"
      ) as HTMLInputElement;
      expect(input.checked).toBe(true);
    });

    it("should toggle checked state on click", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: "<r-checkbox>Option</r-checkbox>",
      });

      const label = page.root.querySelector(".r-checkbox") as HTMLElement;
      label.click();

      await page.waitForChanges();

      expect(page.rootInstance.checked).toBe(true);
      expect(label.classList.contains("r-checkbox--checked")).toBe(true);
    });

    it("should toggle from checked to unchecked", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: "<r-checkbox checked>Option</r-checkbox>",
      });

      const label = page.root.querySelector(".r-checkbox") as HTMLElement;
      label.click();

      await page.waitForChanges();

      expect(page.rootInstance.checked).toBe(false);
    });
  });

  // ==================== INDETERMINATE STATE TESTS ====================
  describe("indeterminate state", () => {
    it("should render indeterminate state", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: "<r-checkbox indeterminate>Option</r-checkbox>",
      });

      const checkbox = page.root.querySelector(".r-checkbox");
      expect(checkbox.classList.contains("r-checkbox--indeterminate")).toBe(
        true
      );
    });

    it("should clear indeterminate on click", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: "<r-checkbox indeterminate>Option</r-checkbox>",
      });

      const label = page.root.querySelector(".r-checkbox") as HTMLElement;
      label.click();

      await page.waitForChanges();

      expect(page.rootInstance.indeterminate).toBe(false);
    });
  });

  // ==================== DISABLED STATE TESTS ====================
  describe("disabled state", () => {
    it("should render disabled state", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: "<r-checkbox disabled>Option</r-checkbox>",
      });

      const checkbox = page.root.querySelector(".r-checkbox");
      expect(checkbox.classList.contains("r-checkbox--disabled")).toBe(true);

      const input = page.root.querySelector(
        ".r-checkbox__original"
      ) as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });

    it("should not toggle when disabled", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: "<r-checkbox disabled>Option</r-checkbox>",
      });

      const label = page.root.querySelector(".r-checkbox") as HTMLElement;
      label.click();

      await page.waitForChanges();

      expect(page.rootInstance.checked).toBe(false);
    });

    it("should not emit change event when disabled", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: "<r-checkbox disabled>Option</r-checkbox>",
      });

      const changeSpy = jest.fn();
      page.root.addEventListener("change", changeSpy);

      const label = page.root.querySelector(".r-checkbox") as HTMLElement;
      label.click();

      expect(changeSpy).not.toHaveBeenCalled();
    });
  });

  // ==================== KEYBOARD INTERACTION TESTS ====================
  describe("keyboard interaction", () => {
    it("should toggle on Space/Enter", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: "<r-checkbox>Option</r-checkbox>",
      });

      const input = page.root.querySelector(
        ".r-checkbox__original"
      ) as HTMLElement;

      input.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
      await page.waitForChanges();
      expect(page.rootInstance.checked).toBe(true);

      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
      await page.waitForChanges();
      expect(page.rootInstance.checked).toBe(false);
    });

    it("should not toggle when disabled via keyboard", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: "<r-checkbox disabled>Option</r-checkbox>",
      });

      const input = page.root.querySelector(
        ".r-checkbox__original"
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
        components: [RCheckbox],
        html: "<r-checkbox>Option</r-checkbox>",
      });

      const checkbox = page.root.querySelector(".r-checkbox");
      expect(checkbox.classList.contains("r-checkbox--large")).toBe(false);
      expect(checkbox.classList.contains("r-checkbox--small")).toBe(false);
    });

    it("should render large size", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: '<r-checkbox size="large">Option</r-checkbox>',
      });

      const checkbox = page.root.querySelector(".r-checkbox");
      expect(checkbox.classList.contains("r-checkbox--large")).toBe(true);
    });

    it("should render small size", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: '<r-checkbox size="small">Option</r-checkbox>',
      });

      const checkbox = page.root.querySelector(".r-checkbox");
      expect(checkbox.classList.contains("r-checkbox--small")).toBe(true);
    });
  });

  // ==================== BORDER TESTS ====================
  describe("border", () => {
    it("should not have border by default", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: "<r-checkbox>Option</r-checkbox>",
      });

      const checkbox = page.root.querySelector(".r-checkbox");
      expect(checkbox.classList.contains("r-checkbox--border")).toBe(false);
    });

    it("should render with border", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: "<r-checkbox border>Option</r-checkbox>",
      });

      const checkbox = page.root.querySelector(".r-checkbox");
      expect(checkbox.classList.contains("r-checkbox--border")).toBe(true);
    });
  });

  // ==================== VALUE TESTS ====================
  describe("value", () => {
    it("should set value attribute", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: '<r-checkbox value="option1">Option 1</r-checkbox>',
      });

      const input = page.root.querySelector(".r-checkbox__original");
      expect(input.getAttribute("value")).toBe("option1");
    });

    it("should handle numeric value", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: '<r-checkbox value="123">Option</r-checkbox>',
      });

      const input = page.root.querySelector(".r-checkbox__original");
      expect(input.getAttribute("value")).toBe("123");
    });
  });

  // ==================== NAME TESTS ====================
  describe("name", () => {
    it("should set name attribute", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: '<r-checkbox name="agreement">I agree</r-checkbox>',
      });

      const input = page.root.querySelector(".r-checkbox__original");
      expect(input.getAttribute("name")).toBe("agreement");
    });
  });

  // ==================== EVENT TESTS ====================
  describe("events", () => {
    it("should emit change event when checked", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: "<r-checkbox>Option</r-checkbox>",
      });

      const changeSpy = jest.fn();
      page.root.addEventListener("change", changeSpy);

      const label = page.root.querySelector(".r-checkbox") as HTMLElement;
      label.click();

      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy.mock.calls[0][0].detail).toBe(true);
    });

    it("should emit change event when unchecked", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: "<r-checkbox checked>Option</r-checkbox>",
      });

      const changeSpy = jest.fn();
      page.root.addEventListener("change", changeSpy);

      const label = page.root.querySelector(".r-checkbox") as HTMLElement;
      label.click();

      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy.mock.calls[0][0].detail).toBe(false);
    });

    it("should bubble change event", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: '<div id="parent"><r-checkbox>Option</r-checkbox></div>',
      });

      const changeSpy = jest.fn();
      page.body.querySelector("#parent").addEventListener("change", changeSpy);

      const label = page.root.querySelector(".r-checkbox") as HTMLElement;
      label.click();

      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalled();
    });
  });

  // ==================== KEYBOARD TESTS ====================
  describe("keyboard interaction", () => {
    it("should toggle on Space key", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: "<r-checkbox>Option</r-checkbox>",
      });

      const input = page.root.querySelector(
        ".r-checkbox__original"
      ) as HTMLInputElement;
      input.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));

      await page.waitForChanges();

      expect(page.rootInstance.checked).toBe(true);
    });

    it("should toggle on Enter key", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: "<r-checkbox>Option</r-checkbox>",
      });

      const input = page.root.querySelector(
        ".r-checkbox__original"
      ) as HTMLInputElement;
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

      await page.waitForChanges();

      expect(page.rootInstance.checked).toBe(true);
    });

    it("should not toggle on other keys", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: "<r-checkbox>Option</r-checkbox>",
      });

      const input = page.root.querySelector(
        ".r-checkbox__original"
      ) as HTMLInputElement;
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));

      await page.waitForChanges();

      expect(page.rootInstance.checked).toBe(false);
    });
  });

  // ==================== FOCUS TESTS ====================
  describe("focus state", () => {
    it("should add focused class on focus", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: "<r-checkbox>Option</r-checkbox>",
      });

      const input = page.root.querySelector(
        ".r-checkbox__original"
      ) as HTMLInputElement;
      input.dispatchEvent(new FocusEvent("focus"));

      await page.waitForChanges();

      const checkbox = page.root.querySelector(".r-checkbox");
      expect(checkbox.classList.contains("r-checkbox--focused")).toBe(true);
    });

    it("should remove focused class on blur", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: "<r-checkbox>Option</r-checkbox>",
      });

      const input = page.root.querySelector(
        ".r-checkbox__original"
      ) as HTMLInputElement;
      input.dispatchEvent(new FocusEvent("focus"));
      await page.waitForChanges();

      input.dispatchEvent(new FocusEvent("blur"));
      await page.waitForChanges();

      const checkbox = page.root.querySelector(".r-checkbox");
      expect(checkbox.classList.contains("r-checkbox--focused")).toBe(false);
    });
  });

  // ==================== ACCESSIBILITY TESTS ====================
  describe("accessibility", () => {
    it("should have input element for keyboard interaction", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: "<r-checkbox>Option</r-checkbox>",
      });

      const input = page.root.querySelector(
        ".r-checkbox__original"
      ) as HTMLInputElement;
      expect(input).not.toBeNull();
      expect(input.type).toBe("checkbox");
    });

    it("should have proper label association", async () => {
      page = await newSpecPage({
        components: [RCheckbox],
        html: "<r-checkbox>Option</r-checkbox>",
      });

      const label = page.root.querySelector(".r-checkbox");
      expect(label.tagName.toLowerCase()).toBe("label");

      const input = page.root.querySelector(".r-checkbox__original");
      expect(input).not.toBeNull();
    });
  });
});
