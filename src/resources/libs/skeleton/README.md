# Skeleton Component Usage Guide

The Skeleton component system provides reusable loading placeholders throughout the application.

## Components

### 1. `Skeleton` (Base Component)

Basic skeleton element with customizable shape and size.

```jsx
import { Skeleton } from "@libs/skeleton";

// Line (default)
<Skeleton variant="line" width={200} height={16} />

// Circle
<Skeleton variant="circle" width={40} height={40} />

// Rectangle
<Skeleton variant="rectangle" width={300} height={200} />
```

**Props:**
- `variant`: `'line'` | `'circle'` | `'rectangle'` (default: `'line'`)
- `width`: CSS width value (string or number)
- `height`: CSS height value (string or number)
- `className`: Additional CSS classes
- `style`: Inline styles object

---

### 2. `SkeletonText`

Multiple lines of skeleton text.

```jsx
import { SkeletonText } from "@libs/skeleton";

// 3 lines with default width
<SkeletonText lines={3} />

// Custom widths for each line
<SkeletonText 
  lines={3} 
  width={["80%", "60%", "70%"]} 
  height={14}
  spacing={8}
/>
```

**Props:**
- `lines`: Number of lines (default: 3)
- `width`: Width of lines - single value or array for different widths (default: "100%")
- `height`: Height of each line (default: 14)
- `spacing`: Gap between lines (default: 8)
- `className`: Additional CSS classes

---

### 3. `SkeletonCard`

Card-shaped skeleton with optional avatar.

```jsx
import { SkeletonCard } from "@libs/skeleton";

// Basic card
<SkeletonCard lines={3} />

// Card with avatar
<SkeletonCard hasAvatar={true} avatarSize={40} lines={3} />
```

**Props:**
- `hasAvatar`: Whether to show avatar circle (default: false)
- `avatarSize`: Size of avatar in pixels (default: 40)
- `lines`: Number of text lines (default: 3)
- `className`: Additional CSS classes

---

### 4. `SkeletonMessage`

Message-shaped skeleton for chat interfaces.

```jsx
import { SkeletonMessage } from "@libs/skeleton";

<SkeletonMessage lines={2} />
```

**Props:**
- `lines`: Number of message lines (default: 2)
- `className`: Additional CSS classes

---

### 5. `ChatWindowSkeleton`

Full chat window skeleton (pre-configured).

```jsx
import { ChatWindowSkeleton } from "@libs/skeleton";

<ChatWindowSkeleton />
```

No props - displays complete chat window skeleton.

---

### 6. `PageSkeleton`

Full page skeleton with header and cards.

```jsx
import { PageSkeleton } from "@libs/skeleton";

<PageSkeleton hasHeader={true} cards={3} />
```

**Props:**
- `hasHeader`: Whether to show header skeleton (default: true)
- `cards`: Number of card skeletons to display (default: 3)
- `className`: Additional CSS classes

---

## Usage Examples

### Example 1: Simple Loading State

```jsx
import { useState, useEffect } from "react";
import { SkeletonText } from "@libs/skeleton";

function MyComponent() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then(result => {
      setData(result);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <SkeletonText lines={3} />;
  }

  return <div>{data.content}</div>;
}
```

---

### Example 2: Page with Multiple Skeletons

```jsx
import { PageSkeleton } from "@libs/skeleton";

function Dashboard() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <PageSkeleton hasHeader={true} cards={5} />;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Your content */}
    </div>
  );
}
```

---

### Example 3: Custom Skeleton Layout

```jsx
import { Skeleton, SkeletonText } from "@libs/skeleton";

function CustomSkeleton() {
  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <Skeleton variant="circle" width={60} height={60} />
      <div style={{ flex: 1 }}>
        <Skeleton variant="line" width="40%" height={20} />
        <SkeletonText lines={2} width={["80%", "60%"]} />
      </div>
    </div>
  );
}
```

---

### Example 4: Lazy Loading with Suspense

```jsx
import { lazy, Suspense } from "react";
import { ChatWindowSkeleton } from "@libs/skeleton";

const ChatWindow = lazy(() => import("./components/ChatWindow/ChatWindow.jsx"));

function App() {
  return (
    <Suspense fallback={<ChatWindowSkeleton />}>
      <ChatWindow />
    </Suspense>
  );
}
```

---

## Styling

The skeleton styles are automatically imported in:
- `src/resources/scss/main-app/index.scss` (for main app)
- `src/resources/scss/the-ai/index.scss` (for AI chat)

### Dark Mode Support

The skeleton component automatically adapts to dark mode using `prefers-color-scheme: dark`.

---

## Best Practices

1. **Match the content shape**: Use skeleton components that match your actual content layout
2. **Keep it simple**: Don't over-complicate skeleton layouts
3. **Use appropriate timing**: Show skeletons for operations taking > 300ms
4. **Be consistent**: Use the same skeleton style for similar content types
5. **Avoid layout shift**: Ensure skeleton dimensions match the actual content

---

## Animation

All skeleton components use a shimmer animation that runs continuously. The animation is defined in the SCSS:

```scss
@keyframes arraysubscription-skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

Animation duration: 1.5s (infinite loop)
