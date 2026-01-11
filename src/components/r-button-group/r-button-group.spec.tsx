import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RButtonGroup } from './r-button-group';
import { RButton } from '../r-button/r-button';

describe('r-button-group', () => {
  let page: SpecPage;

  const createButtonGroup = async (html: string) => {
    page = await newSpecPage({
      components: [RButtonGroup, RButton],
      html,
    });
    return page;
  };

  describe('rendering', () => {
    it('should render with default props', async () => {
      await createButtonGroup('<r-button-group></r-button-group>');
      const group = page.root.querySelector('.r-button-group');
      expect(group).toBeTruthy();
      expect(group.getAttribute('role')).toBe('group');
    });

    it('should render slot content', async () => {
      await createButtonGroup(`
        <r-button-group>
          <r-button>Button 1</r-button>
          <r-button>Button 2</r-button>
        </r-button-group>
      `);
      const buttons = page.root.querySelectorAll('r-button');
      expect(buttons.length).toBe(2);
    });
  });

  describe('direction prop', () => {
    it('should default to horizontal', async () => {
      await createButtonGroup('<r-button-group></r-button-group>');
      const component = page.rootInstance as RButtonGroup;
      expect(component.direction).toBe('horizontal');
    });

    it('should apply horizontal class', async () => {
      await createButtonGroup('<r-button-group direction="horizontal"></r-button-group>');
      const group = page.root.querySelector('.r-button-group');
      expect(group).toHaveClass('r-button-group--horizontal');
    });

    it('should apply vertical class', async () => {
      await createButtonGroup('<r-button-group direction="vertical"></r-button-group>');
      const group = page.root.querySelector('.r-button-group');
      expect(group).toHaveClass('r-button-group--vertical');
    });
  });

  describe('size prop', () => {
    it('should accept size prop', async () => {
      await createButtonGroup('<r-button-group size="large"></r-button-group>');
      const component = page.rootInstance as RButtonGroup;
      expect(component.size).toBe('large');
    });

    it('should accept small size', async () => {
      await createButtonGroup('<r-button-group size="small"></r-button-group>');
      const component = page.rootInstance as RButtonGroup;
      expect(component.size).toBe('small');
    });

    it('should accept default size', async () => {
      await createButtonGroup('<r-button-group size="default"></r-button-group>');
      const component = page.rootInstance as RButtonGroup;
      expect(component.size).toBe('default');
    });
  });

  describe('type prop', () => {
    it('should accept type prop', async () => {
      await createButtonGroup('<r-button-group type="primary"></r-button-group>');
      const component = page.rootInstance as RButtonGroup;
      expect(component.type).toBe('primary');
    });

    it('should accept success type', async () => {
      await createButtonGroup('<r-button-group type="success"></r-button-group>');
      const component = page.rootInstance as RButtonGroup;
      expect(component.type).toBe('success');
    });

    it('should accept warning type', async () => {
      await createButtonGroup('<r-button-group type="warning"></r-button-group>');
      const component = page.rootInstance as RButtonGroup;
      expect(component.type).toBe('warning');
    });

    it('should accept danger type', async () => {
      await createButtonGroup('<r-button-group type="danger"></r-button-group>');
      const component = page.rootInstance as RButtonGroup;
      expect(component.type).toBe('danger');
    });

    it('should accept info type', async () => {
      await createButtonGroup('<r-button-group type="info"></r-button-group>');
      const component = page.rootInstance as RButtonGroup;
      expect(component.type).toBe('info');
    });
  });

  describe('accessibility', () => {
    it('should have group role', async () => {
      await createButtonGroup('<r-button-group></r-button-group>');
      const group = page.root.querySelector('.r-button-group');
      expect(group.getAttribute('role')).toBe('group');
    });
  });

  describe('button grouping', () => {
    it('should group multiple buttons', async () => {
      await createButtonGroup(`
        <r-button-group>
          <r-button>Previous</r-button>
          <r-button>Current</r-button>
          <r-button>Next</r-button>
        </r-button-group>
      `);
      const buttons = page.root.querySelectorAll('r-button');
      expect(buttons.length).toBe(3);
    });

    it('should work with different button types', async () => {
      await createButtonGroup(`
        <r-button-group>
          <r-button type="primary">Primary</r-button>
          <r-button type="success">Success</r-button>
          <r-button type="danger">Danger</r-button>
        </r-button-group>
      `);
      const buttons = page.root.querySelectorAll('r-button');
      expect(buttons[0].getAttribute('type')).toBe('primary');
      expect(buttons[1].getAttribute('type')).toBe('success');
      expect(buttons[2].getAttribute('type')).toBe('danger');
    });
  });

  describe('class generation', () => {
    it('should generate correct class string', async () => {
      await createButtonGroup('<r-button-group direction="vertical"></r-button-group>');
      const group = page.root.querySelector('.r-button-group');
      expect(group).toHaveClass('r-button-group');
      expect(group).toHaveClass('r-button-group--vertical');
    });

    it('should handle horizontal direction class', async () => {
      await createButtonGroup('<r-button-group direction="horizontal"></r-button-group>');
      const group = page.root.querySelector('.r-button-group');
      expect(group).toHaveClass('r-button-group');
      expect(group).toHaveClass('r-button-group--horizontal');
    });
  });
});
