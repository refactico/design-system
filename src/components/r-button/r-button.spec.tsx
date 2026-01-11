import { newSpecPage, SpecPage } from "@stencil/core/testing";
import { RButton } from "./r-button";

describe("r-button", () => {
  let page: SpecPage;

  // ==================== RENDERING TESTS ====================
  describe("rendering", () => {
    it("should render with default props", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: "<r-button>Click me</r-button>",
      });

      const button = page.root.querySelector(".r-button");
      expect(button).not.toBeNull();
      expect(button.tagName.toLowerCase()).toBe("button");
      expect(button.getAttribute("type")).toBe("button");
      expect(button.classList.contains("r-button")).toBe(true);
      expect(button.textContent).toContain("Click me");
    });

    it("should render slot content correctly", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: '<r-button><span class="custom-content">Custom</span></r-button>',
      });

      const customContent = page.root.querySelector(".custom-content");
      expect(customContent).not.toBeNull();
      expect(customContent.textContent).toBe("Custom");
    });

    it("should render with icon slot", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: '<r-button icon="★">With Icon</r-button>',
      });

      const iconSlot = page.root.querySelector(".r-button__icon");
      expect(iconSlot).not.toBeNull();
    });
  });

  // ==================== SIZE TESTS ====================
  describe("sizes", () => {
    it("should render default size without size class", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: '<r-button size="default">Default</r-button>',
      });

      const button = page.root.querySelector(".r-button");
      expect(button.classList.contains("r-button--large")).toBe(false);
      expect(button.classList.contains("r-button--small")).toBe(false);
    });

    it("should render large size", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: '<r-button size="large">Large</r-button>',
      });

      const button = page.root.querySelector(".r-button");
      expect(button.classList.contains("r-button--large")).toBe(true);
    });

    it("should render small size", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: '<r-button size="small">Small</r-button>',
      });

      const button = page.root.querySelector(".r-button");
      expect(button.classList.contains("r-button--small")).toBe(true);
    });

    it("should expose size via getSize method", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: '<r-button size="large">Large</r-button>',
      });

      const component = page.rootInstance;
      const size = await component.getSize();
      expect(size).toBe("large");
    });
  });

  // ==================== TYPE TESTS ====================
  describe("types", () => {
    const types = ["primary", "success", "warning", "danger", "info"];

    types.forEach((type) => {
      it(`should render ${type} type`, async () => {
        page = await newSpecPage({
          components: [RButton],
          html: `<r-button type="${type}">${type}</r-button>`,
        });

        const button = page.root.querySelector(".r-button");
        expect(button.classList.contains(`r-button--${type}`)).toBe(true);
      });
    });

    it("should not add type class for default type", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: '<r-button type="default">Default</r-button>',
      });

      const button = page.root.querySelector(".r-button");
      expect(button.classList.contains("r-button--default")).toBe(false);
    });

    it("should expose type via getType method", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: '<r-button type="primary">Primary</r-button>',
      });

      const component = page.rootInstance;
      const type = await component.getType();
      expect(type).toBe("primary");
    });
  });

  // ==================== VARIANT TESTS ====================
  describe("variants", () => {
    it("should render plain variant", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: "<r-button plain>Plain</r-button>",
      });

      const button = page.root.querySelector(".r-button");
      expect(button.classList.contains("r-button--plain")).toBe(true);
    });

    it("should render text variant", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: "<r-button text>Text</r-button>",
      });

      const button = page.root.querySelector(".r-button");
      expect(button.classList.contains("r-button--text")).toBe(true);
    });

    it("should render text variant with background", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: "<r-button text bg>Text BG</r-button>",
      });

      const button = page.root.querySelector(".r-button");
      expect(button.classList.contains("r-button--text")).toBe(true);
      expect(button.classList.contains("r-button--text-bg")).toBe(true);
    });

    it("should render link variant", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: "<r-button link>Link</r-button>",
      });

      const button = page.root.querySelector(".r-button");
      expect(button.classList.contains("r-button--link")).toBe(true);
    });

    it("should render round variant", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: "<r-button round>Round</r-button>",
      });

      const button = page.root.querySelector(".r-button");
      expect(button.classList.contains("r-button--round")).toBe(true);
    });

    it("should render circle variant", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: "<r-button circle>C</r-button>",
      });

      const button = page.root.querySelector(".r-button");
      expect(button.classList.contains("r-button--circle")).toBe(true);
    });

    it("should combine multiple variants", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: '<r-button type="primary" plain round>Combined</r-button>',
      });

      const button = page.root.querySelector(".r-button");
      expect(button.classList.contains("r-button--primary")).toBe(true);
      expect(button.classList.contains("r-button--plain")).toBe(true);
      expect(button.classList.contains("r-button--round")).toBe(true);
    });
  });

  // ==================== DISABLED STATE TESTS ====================
  describe("disabled state", () => {
    it("should render disabled state", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: "<r-button disabled>Disabled</r-button>",
      });

      const button = page.root.querySelector(".r-button") as HTMLButtonElement;
      expect(button.classList.contains("r-button--disabled")).toBe(true);
      expect(button.getAttribute("disabled")).not.toBeNull();
    });

    it("should expose disabled state via getDisabled method", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: "<r-button disabled>Disabled</r-button>",
      });

      const component = page.rootInstance;
      const disabled = await component.getDisabled();
      expect(disabled).toBe(true);
    });

    it("should not emit click event when disabled", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: "<r-button disabled>Disabled</r-button>",
      });

      const clickSpy = jest.fn();
      page.root.addEventListener("clicked", clickSpy);

      const button = page.root.querySelector(".r-button") as HTMLButtonElement;
      button.click();

      expect(clickSpy).not.toHaveBeenCalled();
    });

    it("should prevent default and stop propagation when disabled", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: "<r-button disabled>Disabled</r-button>",
      });

      const button = page.root.querySelector(".r-button") as HTMLButtonElement;
      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      });
      const preventDefaultSpy = jest.spyOn(event, "preventDefault");
      const stopPropagationSpy = jest.spyOn(event, "stopPropagation");

      button.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(stopPropagationSpy).toHaveBeenCalled();
    });
  });

  // ==================== LOADING STATE TESTS ====================
  describe("loading state", () => {
    it("should render loading state", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: "<r-button loading>Loading</r-button>",
      });

      const button = page.root.querySelector(".r-button");
      expect(button.classList.contains("r-button--loading")).toBe(true);
    });

    it("should show loading spinner when loading", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: "<r-button loading>Loading</r-button>",
      });

      const spinner = page.root.querySelector(".r-button__loading-icon");
      expect(spinner).not.toBeNull();

      const svg = spinner.querySelector(".r-button__loading-spinner");
      expect(svg).not.toBeNull();
    });

    it("should disable button when loading", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: "<r-button loading>Loading</r-button>",
      });

      const button = page.root.querySelector(".r-button") as HTMLButtonElement;
      expect(button.getAttribute("disabled")).not.toBeNull();
    });

    it("should not emit click event when loading", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: "<r-button loading>Loading</r-button>",
      });

      const clickSpy = jest.fn();
      page.root.addEventListener("clicked", clickSpy);

      const button = page.root.querySelector(".r-button") as HTMLButtonElement;
      button.click();

      expect(clickSpy).not.toHaveBeenCalled();
    });

    it("should hide icon when loading", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: '<r-button loading icon="★">Loading</r-button>',
      });

      const icon = page.root.querySelector(".r-button__icon");
      expect(icon).toBeNull();
    });
  });

  // ==================== NATIVE TYPE TESTS ====================
  describe("native types", () => {
    it("should render button type by default", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: "<r-button>Button</r-button>",
      });

      const button = page.root.querySelector(".r-button");
      expect(button.getAttribute("type")).toBe("button");
    });

    it("should render submit type", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: '<r-button native-type="submit">Submit</r-button>',
      });

      const button = page.root.querySelector(".r-button");
      expect(button.getAttribute("type")).toBe("submit");
    });

    it("should render reset type", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: '<r-button native-type="reset">Reset</r-button>',
      });

      const button = page.root.querySelector(".r-button");
      expect(button.getAttribute("type")).toBe("reset");
    });
  });

  // ==================== CUSTOM TAG TESTS ====================
  describe("custom tag", () => {
    it('should render as anchor when tag is "a"', async () => {
      page = await newSpecPage({
        components: [RButton],
        html: '<r-button tag="a">Link</r-button>',
      });

      const element = page.root.querySelector(".r-button");
      expect(element.tagName.toLowerCase()).toBe("a");
    });

    it("should not have type attribute when tag is not button", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: '<r-button tag="a">Link</r-button>',
      });

      const element = page.root.querySelector(".r-button");
      expect(element.hasAttribute("type")).toBe(false);
    });

    it('should render as div when tag is "div"', async () => {
      page = await newSpecPage({
        components: [RButton],
        html: '<r-button tag="div">Div</r-button>',
      });

      const element = page.root.querySelector(".r-button");
      expect(element.tagName.toLowerCase()).toBe("div");
    });
  });

  // ==================== AUTOFOCUS TESTS ====================
  describe("autofocus", () => {
    it("should set autofocus attribute", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: "<r-button autofocus>Autofocus</r-button>",
      });

      const button = page.root.querySelector(".r-button");
      expect(button.hasAttribute("autofocus")).toBe(true);
    });
  });

  // ==================== CUSTOM COLOR TESTS ====================
  describe("custom color", () => {
    it("should apply custom color class", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: '<r-button color="#ff0000">Custom</r-button>',
      });

      const button = page.root.querySelector(".r-button");
      expect(button.classList.contains("r-button--custom-color")).toBe(true);
    });

    it("should set custom color CSS variables", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: '<r-button color="#ff0000">Custom</r-button>',
      });

      const button = page.root.querySelector(".r-button") as HTMLElement;
      expect(
        button.style.getPropertyValue("--r-button-custom-bg")
      ).toBeTruthy();
      expect(
        button.style.getPropertyValue("--r-button-custom-text")
      ).toBeTruthy();
      expect(
        button.style.getPropertyValue("--r-button-custom-border")
      ).toBeTruthy();
    });

    it("should apply plain variant with custom color", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: '<r-button color="#ff0000" plain>Custom Plain</r-button>',
      });

      const button = page.root.querySelector(".r-button") as HTMLElement;
      expect(button.classList.contains("r-button--plain")).toBe(true);
      expect(button.classList.contains("r-button--custom-color")).toBe(true);
    });
  });

  // ==================== AUTO INSERT SPACE TESTS ====================
  describe("auto insert space", () => {
    it("should add space class for two Chinese characters", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: "<r-button auto-insert-space>确定</r-button>",
      });

      await page.waitForChanges();

      const button = page.root.querySelector(".r-button");
      expect(button.classList.contains("r-button--has-space")).toBe(true);
    });

    it("should not add space class for non-Chinese text", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: "<r-button auto-insert-space>OK</r-button>",
      });

      const button = page.root.querySelector(".r-button");
      expect(button.classList.contains("r-button--has-space")).toBe(false);
    });

    it("should not add space class for more than two Chinese characters", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: "<r-button auto-insert-space>确定吧</r-button>",
      });

      const button = page.root.querySelector(".r-button");
      expect(button.classList.contains("r-button--has-space")).toBe(false);
    });
  });

  // ==================== EVENT TESTS ====================
  describe("events", () => {
    it("should emit clicked event on click", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: "<r-button>Click</r-button>",
      });

      const clickSpy = jest.fn();
      page.root.addEventListener("clicked", clickSpy);

      const button = page.root.querySelector(".r-button") as HTMLButtonElement;
      button.click();

      expect(clickSpy).toHaveBeenCalledTimes(1);
    });

    it("should pass MouseEvent in clicked event", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: "<r-button>Click</r-button>",
      });

      let receivedEvent: CustomEvent;
      page.root.addEventListener("clicked", (e: CustomEvent) => {
        receivedEvent = e;
      });

      const button = page.root.querySelector(".r-button") as HTMLButtonElement;
      const mouseEvent = new MouseEvent("click", { bubbles: true });
      button.dispatchEvent(mouseEvent);

      expect(receivedEvent).toBeDefined();
      expect(receivedEvent.detail).toBeDefined();
    });

    it("should bubble clicked event", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: '<div id="parent"><r-button>Click</r-button></div>',
      });

      const clickSpy = jest.fn();
      page.body.querySelector("#parent").addEventListener("clicked", clickSpy);

      const button = page.root.querySelector(".r-button") as HTMLButtonElement;
      button.click();

      expect(clickSpy).toHaveBeenCalled();
    });
  });

  // ==================== METHOD TESTS ====================
  describe("methods", () => {
    it("should return button ref via getRef method", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: "<r-button>Button</r-button>",
      });

      const component = page.rootInstance;
      const ref = await component.getRef();

      expect(ref).not.toBeNull();
      expect(ref.classList.contains("r-button")).toBe(true);
    });
  });

  // ==================== ACCESSIBILITY TESTS ====================
  describe("accessibility", () => {
    it("should be focusable", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: "<r-button>Accessible</r-button>",
      });

      const button = page.root.querySelector(".r-button") as HTMLButtonElement;
      expect(button.tabIndex).not.toBe(-1);
    });

    it("should not be focusable when disabled", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: "<r-button disabled>Disabled</r-button>",
      });

      const button = page.root.querySelector(".r-button") as HTMLButtonElement;
      expect(button.getAttribute("disabled")).not.toBeNull();
      expect(button.getAttribute("tabindex")).toBe("-1");
    });
  });

  // ==================== KEYBOARD INTERACTION TESTS ====================
  describe("keyboard interaction", () => {
    it("should emit clicked on Enter/Space for non-button tag", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: '<r-button tag="div">Press</r-button>',
      });

      const clickSpy = jest.fn();
      page.root.addEventListener("clicked", clickSpy);

      const button = page.root.querySelector(".r-button") as HTMLElement;
      button.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
      button.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));

      expect(clickSpy).toHaveBeenCalledTimes(2);
    });

    it("should ignore keyboard when disabled or loading", async () => {
      page = await newSpecPage({
        components: [RButton],
        html: '<r-button tag="div" disabled loading>Press</r-button>',
      });

      const clickSpy = jest.fn();
      page.root.addEventListener("clicked", clickSpy);

      const button = page.root.querySelector(".r-button") as HTMLElement;
      button.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
      button.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));

      expect(clickSpy).not.toHaveBeenCalled();
    });
  });
});
