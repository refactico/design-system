# How Cursor AI Uses Component Creation Rules

## ✅ Yes, It Works Automatically!

When your friend (or anyone) opens this project in Cursor and asks to create a component, Cursor will **automatically** read the `.cursorrules` file and follow the guidelines.

## How It Works

1. **Cursor automatically detects `.cursorrules`** in the workspace root
2. **When you ask:** "create r-card component"
3. **Cursor will:**
   - Read `.cursorrules` file
   - Check `COMPONENT_TEMPLATE.tsx`
   - Reference `COMPONENT_CREATION_GUIDE.md`
   - Look at existing components for examples
   - Follow all the rules automatically

## File Location

The `.cursorrules` file is located at:
```
design-system/.cursorrules
```

Cursor reads this file from the workspace root when you're working in the `design-system` folder.

## Testing It

To verify it works:

1. Open Cursor in the `design-system` folder
2. Ask: "create r-card component"
3. The AI should:
   - ✅ Use `removeUndefinedProps`
   - ✅ Use `IonicColor` type (not `string`)
   - ✅ Use `FillStyle` type (not `'outline' | 'solid'`)
   - ✅ Set `shadow: false`
   - ✅ Create all required files
   - ✅ Add to `app-home.tsx`

## If It Doesn't Work

If Cursor doesn't seem to follow the rules:

1. **Check file location:** Make sure `.cursorrules` is in `design-system/` root
2. **Restart Cursor:** Sometimes Cursor needs a restart to pick up new rules
3. **Explicit mention:** Try saying "create r-card component following the component creation guide"
4. **Check workspace:** Make sure you're in the `design-system` folder, not the parent `aa` folder

## Multi-Root Workspace

If you're using a multi-root workspace (like `aa.code-workspace`), Cursor will read `.cursorrules` from each root folder. So if you're working in the `design-system` folder, it will use `design-system/.cursorrules`.

## What Gets Checked

The `.cursorrules` file ensures:
- ✅ Proper imports (`removeUndefinedProps`, types)
- ✅ Type definitions (not strings)
- ✅ Form field utilities (when needed)
- ✅ Component decorator (`shadow: false`)
- ✅ File structure (all required files)
- ✅ Integration (added to app-home)

## Example Conversation

**You:** "create r-card component"

**Cursor (following .cursorrules):**
- Reads `.cursorrules`
- Checks `COMPONENT_TEMPLATE.tsx`
- Creates `r-card.tsx` using `removeUndefinedProps`
- Uses `IonicColor` type for color prop
- Sets `shadow: false`
- Creates all required files
- Adds to `app-home.tsx`

**Result:** Component created following all guidelines! ✅

---

**Note:** The `.cursorrules` file persists even after sessions end. It's part of your codebase and will work for anyone who opens the project in Cursor.

