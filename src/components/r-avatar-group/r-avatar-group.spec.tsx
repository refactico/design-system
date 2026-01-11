import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RAvatarGroup } from './r-avatar-group';
import { RAvatar } from '../r-avatar/r-avatar';

describe('r-avatar-group', () => {
  let page: SpecPage;

  const createAvatarGroup = async (html: string) => {
    page = await newSpecPage({
      components: [RAvatarGroup, RAvatar],
      html,
    });
    return page;
  };

  describe('rendering', () => {
    it('should render with default props', async () => {
      await createAvatarGroup('<r-avatar-group></r-avatar-group>');
      const group = page.root.querySelector('.r-avatar-group');
      expect(group).toBeTruthy();
    });

    it('should render slot content', async () => {
      await createAvatarGroup(`
        <r-avatar-group>
          <r-avatar>A</r-avatar>
          <r-avatar>B</r-avatar>
        </r-avatar-group>
      `);
      const avatars = page.root.querySelectorAll('r-avatar');
      expect(avatars.length).toBe(2);
    });
  });

  describe('size prop', () => {
    it('should default to default size', async () => {
      await createAvatarGroup('<r-avatar-group></r-avatar-group>');
      const component = page.rootInstance as RAvatarGroup;
      expect(component.size).toBe('default');
    });

    it('should apply size class', async () => {
      await createAvatarGroup('<r-avatar-group size="large"></r-avatar-group>');
      const group = page.root.querySelector('.r-avatar-group');
      expect(group).toHaveClass('r-avatar-group--large');
    });

    it('should accept small size', async () => {
      await createAvatarGroup('<r-avatar-group size="small"></r-avatar-group>');
      const group = page.root.querySelector('.r-avatar-group');
      expect(group).toHaveClass('r-avatar-group--small');
    });

    it('should accept numeric size', async () => {
      await createAvatarGroup('<r-avatar-group size="50"></r-avatar-group>');
      const component = page.rootInstance as RAvatarGroup;
      expect(component.size).toBe(50);
    });
  });

  describe('shape prop', () => {
    it('should default to circle', async () => {
      await createAvatarGroup('<r-avatar-group></r-avatar-group>');
      const component = page.rootInstance as RAvatarGroup;
      expect(component.shape).toBe('circle');
    });

    it('should accept square shape', async () => {
      await createAvatarGroup('<r-avatar-group shape="square"></r-avatar-group>');
      const component = page.rootInstance as RAvatarGroup;
      expect(component.shape).toBe('square');
    });
  });

  describe('collapseAvatars prop', () => {
    it('should default to false', async () => {
      await createAvatarGroup('<r-avatar-group></r-avatar-group>');
      const component = page.rootInstance as RAvatarGroup;
      expect(component.collapseAvatars).toBe(false);
    });

    it('should accept collapse setting', async () => {
      await createAvatarGroup('<r-avatar-group collapse-avatars="true"></r-avatar-group>');
      const component = page.rootInstance as RAvatarGroup;
      expect(component.collapseAvatars).toBe(true);
    });
  });

  describe('collapseAvatarsTooltip prop', () => {
    it('should default to false', async () => {
      await createAvatarGroup('<r-avatar-group></r-avatar-group>');
      const component = page.rootInstance as RAvatarGroup;
      expect(component.collapseAvatarsTooltip).toBe(false);
    });

    it('should accept tooltip setting', async () => {
      await createAvatarGroup('<r-avatar-group collapse-avatars-tooltip="true"></r-avatar-group>');
      const component = page.rootInstance as RAvatarGroup;
      expect(component.collapseAvatarsTooltip).toBe(true);
    });
  });

  describe('maxCollapseAvatars prop', () => {
    it('should default to 3', async () => {
      await createAvatarGroup('<r-avatar-group></r-avatar-group>');
      const component = page.rootInstance as RAvatarGroup;
      expect(component.maxCollapseAvatars).toBe(3);
    });

    it('should accept custom max value', async () => {
      await createAvatarGroup('<r-avatar-group max-collapse-avatars="5"></r-avatar-group>');
      const component = page.rootInstance as RAvatarGroup;
      expect(component.maxCollapseAvatars).toBe(5);
    });
  });

  describe('effect prop', () => {
    it('should default to light', async () => {
      await createAvatarGroup('<r-avatar-group></r-avatar-group>');
      const component = page.rootInstance as RAvatarGroup;
      expect(component.effect).toBe('light');
    });

    it('should accept dark effect', async () => {
      await createAvatarGroup('<r-avatar-group effect="dark"></r-avatar-group>');
      const component = page.rootInstance as RAvatarGroup;
      expect(component.effect).toBe('dark');
    });
  });

  describe('placement prop', () => {
    it('should default to top', async () => {
      await createAvatarGroup('<r-avatar-group></r-avatar-group>');
      const component = page.rootInstance as RAvatarGroup;
      expect(component.placement).toBe('top');
    });

    it('should accept bottom placement', async () => {
      await createAvatarGroup('<r-avatar-group placement="bottom"></r-avatar-group>');
      const component = page.rootInstance as RAvatarGroup;
      expect(component.placement).toBe('bottom');
    });

    it('should accept left placement', async () => {
      await createAvatarGroup('<r-avatar-group placement="left"></r-avatar-group>');
      const component = page.rootInstance as RAvatarGroup;
      expect(component.placement).toBe('left');
    });

    it('should accept right placement', async () => {
      await createAvatarGroup('<r-avatar-group placement="right"></r-avatar-group>');
      const component = page.rootInstance as RAvatarGroup;
      expect(component.placement).toBe('right');
    });
  });

  describe('popperClass prop', () => {
    it('should default to empty string', async () => {
      await createAvatarGroup('<r-avatar-group></r-avatar-group>');
      const component = page.rootInstance as RAvatarGroup;
      expect(component.popperClass).toBe('');
    });

    it('should accept custom class', async () => {
      await createAvatarGroup('<r-avatar-group popper-class="custom-tooltip"></r-avatar-group>');
      const component = page.rootInstance as RAvatarGroup;
      expect(component.popperClass).toBe('custom-tooltip');
    });
  });

  describe('collapseClass prop', () => {
    it('should default to empty string', async () => {
      await createAvatarGroup('<r-avatar-group></r-avatar-group>');
      const component = page.rootInstance as RAvatarGroup;
      expect(component.collapseClass).toBe('');
    });

    it('should accept custom class', async () => {
      await createAvatarGroup('<r-avatar-group collapse-class="custom-collapse"></r-avatar-group>');
      const component = page.rootInstance as RAvatarGroup;
      expect(component.collapseClass).toBe('custom-collapse');
    });
  });

  describe('avatar collapsing', () => {
    it('should not collapse when fewer avatars than max', async () => {
      await createAvatarGroup(`
        <r-avatar-group collapse-avatars="true" max-collapse-avatars="5">
          <r-avatar>A</r-avatar>
          <r-avatar>B</r-avatar>
          <r-avatar>C</r-avatar>
        </r-avatar-group>
      `);
      const collapse = page.root.querySelector('.r-avatar-group__collapse');
      expect(collapse).toBeFalsy();
    });

    it('should show collapse indicator when more avatars than max', async () => {
      await createAvatarGroup(`
        <r-avatar-group collapse-avatars="true" max-collapse-avatars="2">
          <r-avatar>A</r-avatar>
          <r-avatar>B</r-avatar>
          <r-avatar>C</r-avatar>
          <r-avatar>D</r-avatar>
        </r-avatar-group>
      `);
      await page.waitForChanges();
      const collapse = page.root.querySelector('.r-avatar-group__collapse');
      expect(collapse).toBeTruthy();
    });

    it('should display correct count in collapse indicator', async () => {
      await createAvatarGroup(`
        <r-avatar-group collapse-avatars="true" max-collapse-avatars="2">
          <r-avatar>A</r-avatar>
          <r-avatar>B</r-avatar>
          <r-avatar>C</r-avatar>
          <r-avatar>D</r-avatar>
        </r-avatar-group>
      `);
      await page.waitForChanges();
      const collapseAvatar = page.root.querySelector('.r-avatar-group__collapse-avatar');
      expect(collapseAvatar.textContent).toContain('+2');
    });
  });

  describe('tooltip functionality', () => {
    it('should show tooltip on hover when enabled', async () => {
      await createAvatarGroup(`
        <r-avatar-group collapse-avatars="true" collapse-avatars-tooltip="true" max-collapse-avatars="2">
          <r-avatar>A</r-avatar>
          <r-avatar>B</r-avatar>
          <r-avatar>C</r-avatar>
        </r-avatar-group>
      `);
      await page.waitForChanges();
      const component = page.rootInstance as RAvatarGroup;
      component.showTooltip = true;
      await page.waitForChanges();
      const tooltip = page.root.querySelector('.r-avatar-group__tooltip');
      expect(tooltip).toBeTruthy();
    });

    it('should hide tooltip when not hovering', async () => {
      await createAvatarGroup(`
        <r-avatar-group collapse-avatars="true" collapse-avatars-tooltip="true" max-collapse-avatars="2">
          <r-avatar>A</r-avatar>
          <r-avatar>B</r-avatar>
          <r-avatar>C</r-avatar>
        </r-avatar-group>
      `);
      await page.waitForChanges();
      const component = page.rootInstance as RAvatarGroup;
      component.showTooltip = false;
      await page.waitForChanges();
      const tooltip = page.root.querySelector('.r-avatar-group__tooltip');
      expect(tooltip).toBeFalsy();
    });
  });

  describe('class generation', () => {
    it('should generate correct class string for string size', async () => {
      await createAvatarGroup('<r-avatar-group size="large"></r-avatar-group>');
      const group = page.root.querySelector('.r-avatar-group');
      expect(group).toHaveClass('r-avatar-group');
      expect(group).toHaveClass('r-avatar-group--large');
    });

    it('should not add size class for numeric size', async () => {
      await createAvatarGroup('<r-avatar-group size="50"></r-avatar-group>');
      const group = page.root.querySelector('.r-avatar-group');
      expect(group).toHaveClass('r-avatar-group');
      expect(group).not.toHaveClass('r-avatar-group--50');
    });
  });

  describe('multiple avatars', () => {
    it('should render multiple avatars', async () => {
      await createAvatarGroup(`
        <r-avatar-group>
          <r-avatar>User 1</r-avatar>
          <r-avatar>User 2</r-avatar>
          <r-avatar>User 3</r-avatar>
          <r-avatar>User 4</r-avatar>
          <r-avatar>User 5</r-avatar>
        </r-avatar-group>
      `);
      const avatars = page.root.querySelectorAll('r-avatar');
      expect(avatars.length).toBe(5);
    });
  });
});
