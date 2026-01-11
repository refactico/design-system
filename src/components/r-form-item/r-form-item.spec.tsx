import { newSpecPage, SpecPage } from "@stencil/core/testing";
import { RFormItem } from "./r-form-item";
import { RForm } from "../r-form/r-form";

describe("r-form-item", () => {
  let page: SpecPage;

  // Helper to create form item page
  const createFormItem = async (html: string) => {
    page = await newSpecPage({
      components: [RFormItem, RForm],
      html,
    });
    return page;
  };

  describe("rendering", () => {
    it("should render with default props", async () => {
      await createFormItem("<r-form-item></r-form-item>");
      const formItem = page.root.querySelector(".r-form-item");
      expect(formItem).toBeTruthy();
      expect(formItem).toHaveClass("r-form-item--right");
    });

    it("should render slot content", async () => {
      await createFormItem('<r-form-item><input type="text" /></r-form-item>');
      const input = page.root.querySelector("input");
      expect(input).toBeTruthy();
    });

    it("should render label when provided", async () => {
      await createFormItem('<r-form-item label="Username"></r-form-item>');
      const label = page.root.querySelector(".r-form-item__label");
      expect(label).toBeTruthy();
      expect(label.textContent).toContain("Username");
    });

    it("should not render label when not provided", async () => {
      await createFormItem("<r-form-item></r-form-item>");
      const label = page.root.querySelector(".r-form-item__label");
      expect(label).toBeFalsy();
    });
  });

  describe("prop prop", () => {
    it("should accept prop name", async () => {
      await createFormItem('<r-form-item prop="username"></r-form-item>');
      const formItemComponent = page.rootInstance as RFormItem;
      expect(formItemComponent.prop).toBe("username");
    });

    it("should default to empty string", async () => {
      await createFormItem("<r-form-item></r-form-item>");
      const formItemComponent = page.rootInstance as RFormItem;
      expect(formItemComponent.prop).toBe("");
    });
  });

  describe("labelText prop", () => {
    it("should render label text", async () => {
      await createFormItem('<r-form-item label="Email Address"></r-form-item>');
      const label = page.root.querySelector(".r-form-item__label");
      expect(label.textContent).toContain("Email Address");
    });
  });

  describe("labelPosition prop", () => {
    it("should apply left position class", async () => {
      await createFormItem(
        '<r-form-item label-position="left" label="Test"></r-form-item>'
      );
      const formItem = page.root.querySelector(".r-form-item");
      expect(formItem).toHaveClass("r-form-item--left");
    });

    it("should apply right position class", async () => {
      await createFormItem(
        '<r-form-item label-position="right" label="Test"></r-form-item>'
      );
      const formItem = page.root.querySelector(".r-form-item");
      expect(formItem).toHaveClass("r-form-item--right");
    });

    it("should apply top position class", async () => {
      await createFormItem(
        '<r-form-item label-position="top" label="Test"></r-form-item>'
      );
      const formItem = page.root.querySelector(".r-form-item");
      expect(formItem).toHaveClass("r-form-item--top");
    });

    it("should inherit from parent form", async () => {
      await createFormItem(`
        <r-form label-position="top">
          <r-form-item label="Test"></r-form-item>
        </r-form>
      `);
      const formItem = page.root.querySelector(".r-form-item");
      expect(formItem).toHaveClass("r-form-item--top");
    });
  });

  describe("labelWidth prop", () => {
    it("should apply label width style", async () => {
      await createFormItem(
        '<r-form-item label-width="150px" label="Test"></r-form-item>'
      );
      const label = page.root.querySelector(
        ".r-form-item__label"
      ) as HTMLElement;
      expect(label.style.width).toBe("150px");
    });

    it("should not apply width for top position", async () => {
      await createFormItem(
        '<r-form-item label-width="150px" label-position="top" label="Test"></r-form-item>'
      );
      const label = page.root.querySelector(
        ".r-form-item__label"
      ) as HTMLElement;
      expect(label.style.width).toBe("");
    });

    it("should inherit from parent form", async () => {
      await createFormItem(`
        <r-form label-width="200px">
          <r-form-item label="Test"></r-form-item>
        </r-form>
      `);
      const label = page.root.querySelector(
        ".r-form-item__label"
      ) as HTMLElement;
      expect(label.style.width).toBe("200px");
    });
  });

  describe("required prop", () => {
    it("should show asterisk when required", async () => {
      await createFormItem(
        '<r-form-item required="true" label="Username"></r-form-item>'
      );
      const asterisk = page.root.querySelector(".r-form-item__asterisk");
      expect(asterisk).toBeTruthy();
      expect(asterisk.textContent).toBe("*");
    });

    it("should not show asterisk when not required", async () => {
      await createFormItem('<r-form-item label="Username"></r-form-item>');
      const asterisk = page.root.querySelector(".r-form-item__asterisk");
      expect(asterisk).toBeFalsy();
    });

    it("should apply required class", async () => {
      await createFormItem(
        '<r-form-item required="true" label="Username"></r-form-item>'
      );
      const formItem = page.root.querySelector(".r-form-item");
      expect(formItem).toHaveClass("r-form-item--required");
    });

    it("should hide asterisk when hideRequiredAsterisk is true on form", async () => {
      await createFormItem(`
        <r-form hide-required-asterisk="true">
          <r-form-item required="true" label="Username"></r-form-item>
        </r-form>
      `);
      const asterisk = page.root.querySelector(".r-form-item__asterisk");
      expect(asterisk).toBeFalsy();
    });
  });

  describe("asterisk position", () => {
    it("should show asterisk on left by default", async () => {
      await createFormItem(
        '<r-form-item required="true" label="Username"></r-form-item>'
      );
      const label = page.root.querySelector(".r-form-item__label");
      const asterisk = label.querySelector(".r-form-item__asterisk");
      // Asterisk should be first child
      expect(label.firstElementChild).toBe(asterisk);
    });

    it("should show asterisk on right when configured", async () => {
      await createFormItem(`
        <r-form require-asterisk-position="right">
          <r-form-item required="true" label="Username"></r-form-item>
        </r-form>
      `);
      const label = page.root.querySelector(".r-form-item__label");
      const asterisk = label.querySelector(".r-form-item__asterisk");
      // Asterisk should be last child
      expect(label.lastElementChild).toBe(asterisk);
    });
  });

  describe("error prop", () => {
    it("should display error message", async () => {
      await createFormItem(
        '<r-form-item error="This field is required" label="Username"></r-form-item>'
      );
      await page.waitForChanges();
      const error = page.root.querySelector(".r-form-item__error");
      expect(error).toBeTruthy();
      expect(error.textContent).toBe("This field is required");
    });

    it("should apply error class", async () => {
      await createFormItem(
        '<r-form-item error="Error message" label="Username"></r-form-item>'
      );
      await page.waitForChanges();
      const formItem = page.root.querySelector(".r-form-item");
      expect(formItem).toHaveClass("r-form-item--error");
    });

    it("should update error message when prop changes", async () => {
      await createFormItem('<r-form-item label="Username"></r-form-item>');
      page.root.setAttribute("error", "New error message");
      await page.waitForChanges();
      const error = page.root.querySelector(".r-form-item__error");
      expect(error.textContent).toBe("New error message");
    });
  });

  describe("showMessage prop", () => {
    it("should hide error message when showMessage is false", async () => {
      await createFormItem(
        '<r-form-item show-message="false" error="Error" label="Username"></r-form-item>'
      );
      await page.waitForChanges();
      const error = page.root.querySelector(".r-form-item__error");
      expect(error).toBeFalsy();
    });

    it("should show error message when showMessage is true", async () => {
      await createFormItem(
        '<r-form-item show-message="true" error="Error" label="Username"></r-form-item>'
      );
      await page.waitForChanges();
      const error = page.root.querySelector(".r-form-item__error");
      expect(error).toBeTruthy();
    });

    it("should inherit from parent form", async () => {
      await createFormItem(`
        <r-form show-message="false">
          <r-form-item error="Error" label="Username"></r-form-item>
        </r-form>
      `);
      await page.waitForChanges();
      const error = page.root.querySelector(".r-form-item__error");
      expect(error).toBeFalsy();
    });
  });

  describe("inlineMessage prop", () => {
    it("should accept inline message setting", async () => {
      await createFormItem('<r-form-item inline-message="true"></r-form-item>');
      const formItemComponent = page.rootInstance as RFormItem;
      expect(formItemComponent.inlineMessage).toBe(true);
    });

    it("should default to false", async () => {
      await createFormItem("<r-form-item></r-form-item>");
      const formItemComponent = page.rootInstance as RFormItem;
      expect(formItemComponent.inlineMessage).toBe(false);
    });
  });

  describe("size prop", () => {
    it("should accept size setting", async () => {
      await createFormItem('<r-form-item size="large"></r-form-item>');
      const formItemComponent = page.rootInstance as RFormItem;
      expect(formItemComponent.size).toBe("large");
    });

    it("should default to empty string", async () => {
      await createFormItem("<r-form-item></r-form-item>");
      const formItemComponent = page.rootInstance as RFormItem;
      expect(formItemComponent.size).toBe("");
    });
  });

  describe("validateField method", () => {
    it("should return true when no rules", async () => {
      await createFormItem('<r-form-item prop="username"></r-form-item>');
      const formItemComponent = page.rootInstance as RFormItem;
      const result = await formItemComponent.validateField();
      expect(result).toBe(true);
    });

    it("should validate required rule", async () => {
      await createFormItem(`
        <r-form>
          <r-form-item prop="username" required="true" label="Username"></r-form-item>
        </r-form>
      `);
      const formItem = page.root.querySelector("r-form-item") as any;
      const result = await formItem.validateField();
      expect(result).toBe(false);
    });

    it("should apply success state on valid", async () => {
      await createFormItem('<r-form-item prop="username"></r-form-item>');
      const formItemComponent = page.rootInstance as RFormItem;
      await formItemComponent.validateField();
      // No rules means success
      expect(formItemComponent.validateState).toBe("");
    });
  });

  describe("resetField method", () => {
    it("should reset validation state", async () => {
      await createFormItem(
        '<r-form-item prop="username" error="Error"></r-form-item>'
      );
      await page.waitForChanges();
      const formItemComponent = page.rootInstance as RFormItem;
      await formItemComponent.resetField();
      expect(formItemComponent.validateState).toBe("");
      expect(formItemComponent.validateMessage).toBe("");
    });
  });

  describe("clearValidate method", () => {
    it("should clear validation state and message", async () => {
      await createFormItem(
        '<r-form-item prop="username" error="Error"></r-form-item>'
      );
      await page.waitForChanges();
      const formItemComponent = page.rootInstance as RFormItem;
      await formItemComponent.clearValidate();
      expect(formItemComponent.validateState).toBe("");
      expect(formItemComponent.validateMessage).toBe("");
    });
  });

  describe("validation states", () => {
    it("should apply error state class", async () => {
      await createFormItem(
        '<r-form-item error="Error message" label="Test"></r-form-item>'
      );
      await page.waitForChanges();
      const formItem = page.root.querySelector(".r-form-item");
      expect(formItem).toHaveClass("r-form-item--error");
    });

    it("should apply success state class after validation", async () => {
      await createFormItem(
        '<r-form-item prop="test" label="Test"></r-form-item>'
      );
      const formItemComponent = page.rootInstance as RFormItem;
      formItemComponent.validateState = "success";
      await page.waitForChanges();
      const formItem = page.root.querySelector(".r-form-item");
      expect(formItem).toHaveClass("r-form-item--success");
    });

    it("should apply validating state class", async () => {
      await createFormItem(
        '<r-form-item prop="test" label="Test"></r-form-item>'
      );
      const formItemComponent = page.rootInstance as RFormItem;
      formItemComponent.validateState = "validating";
      await page.waitForChanges();
      const formItem = page.root.querySelector(".r-form-item");
      expect(formItem).toHaveClass("r-form-item--validating");
    });
  });

  describe("label suffix", () => {
    it("should display label suffix from parent form", async () => {
      await createFormItem(`
        <r-form label-suffix=":">
          <r-form-item label="Username"></r-form-item>
        </r-form>
      `);
      const label = page.root.querySelector(".r-form-item__label");
      expect(label.textContent).toContain(":");
    });
  });

  describe("content wrapper", () => {
    it("should render content wrapper", async () => {
      await createFormItem('<r-form-item><input type="text" /></r-form-item>');
      const content = page.root.querySelector(".r-form-item__content");
      expect(content).toBeTruthy();
    });

    it("should contain slot content", async () => {
      await createFormItem(
        '<r-form-item><input type="text" class="test-input" /></r-form-item>'
      );
      const content = page.root.querySelector(".r-form-item__content");
      const input = content.querySelector(".test-input");
      expect(input).toBeTruthy();
    });
  });
});
