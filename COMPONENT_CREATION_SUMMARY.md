# Component Creation - Quick Start

## 🎯 When Creating a New Component

**Before you start, read these files in order:**

1. **`COMPONENT_QUICK_REFERENCE.md`** - 2-minute overview
2. **`COMPONENT_CREATION_GUIDE.md`** - Full detailed guide
3. **`COMPONENT_CHECKLIST.md`** - Use while creating
4. **`COMPONENT_TEMPLATE.tsx`** - Copy as starting point

## 📁 Files Created

✅ **COMPONENT_CREATION_GUIDE.md** - Complete guide with:
   - Step-by-step instructions
   - Code templates
   - Examples
   - Common mistakes to avoid
   - Decision trees

✅ **COMPONENT_TEMPLATE.tsx** - Ready-to-use template:
   - Standard component template
   - Form field component template
   - All required imports
   - Proper patterns

✅ **COMPONENT_CHECKLIST.md** - Verification checklist:
   - Pre-creation checklist
   - Implementation checklist
   - Integration checklist
   - Final verification

✅ **COMPONENT_QUICK_REFERENCE.md** - Quick reference:
   - Essential imports
   - Must-do checklist
   - Code snippets
   - Decision tree

✅ **.cursorrules** - AI assistant rules:
   - Cursor AI will automatically follow these rules
   - Ensures consistency when AI helps create components

✅ **README.md** - Updated with component creation section

## 🚀 How to Use

### For You (Manual Creation)

1. Open `COMPONENT_QUICK_REFERENCE.md` for quick lookup
2. Copy `COMPONENT_TEMPLATE.tsx` to start your component
3. Follow `COMPONENT_CREATION_GUIDE.md` for details
4. Use `COMPONENT_CHECKLIST.md` to verify completion

### For AI Assistant (Cursor)

The `.cursorrules` file ensures that when you ask AI to create components, it will:
- ✅ Automatically use `removeUndefinedProps`
- ✅ Use proper type definitions
- ✅ Follow form field patterns when needed
- ✅ Include all required files
- ✅ Follow the established patterns

## 📝 Example Workflow

```
1. User: "Create r-card component"
2. AI checks .cursorrules
3. AI uses COMPONENT_TEMPLATE.tsx
4. AI follows COMPONENT_CREATION_GUIDE.md patterns
5. AI uses removeUndefinedProps and types
6. AI creates all required files
7. User verifies with COMPONENT_CHECKLIST.md
```

## 🎯 Key Rules (Always Follow)

1. **Use `removeUndefinedProps`** - Never manually filter props
2. **Use type definitions** - `IonicColor`, `FillStyle`, `IonicMode`
3. **Use form field utilities** - For components with label/error/helper
4. **Set `shadow: false`** - Always for Ionic components
5. **Add to app-home** - For testing and examples

## 📚 File Locations

All documentation is in the root `design-system/` directory:

```
design-system/
├── COMPONENT_CREATION_GUIDE.md      ← Full guide
├── COMPONENT_TEMPLATE.tsx            ← Template file
├── COMPONENT_CHECKLIST.md            ← Verification checklist
├── COMPONENT_QUICK_REFERENCE.md      ← Quick reference
├── .cursorrules                      ← AI assistant rules
└── README.md                         ← Updated with section
```

## ✅ Success Criteria

A component is ready when:
- ✅ Uses all required utilities
- ✅ Follows type definitions
- ✅ Passes all tests
- ✅ Works in app-home
- ✅ Works in Storybook
- ✅ All checklist items completed

---

**Remember:** Consistency is key! Always use the utilities and follow the established patterns.

