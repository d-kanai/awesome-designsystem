# Figma Variables Setup

**このドキュメントはプロジェクト初回セットアップ時に実施する内容です。**
**コンポーネントの取り込みについては [`figma_import_component.md`](./figma_import_component.md) を参照してください。**

---

このドキュメントでは、Figma Design TokensをTailwind CSSに統合する**初回セットアップ手順**と、継続的に参照する**リファレンス情報**を記載しています。

## 概要

Figma MCP (Model Context Protocol) を使用して、Figmaのデザイントークン（変数）を取得し、CSS変数とTailwind設定に変換します。

**⚠️ 注意**: この手順は通常プロジェクト開始時に1回のみ実施します。

## セットアップ手順（初回のみ）

### 1. Figma変数の取得

Figma MCPを使用して、デザイントークンを取得します。

```typescript
// MCPツールを使用
mcp__figma-desktop__get_variable_defs()
```

取得される変数の種類:
- **Color**: テキスト、背景、ボーダー、アイコンの色
- **Typography**: フォントサイズ、フォントファミリー、フォントウェイト
- **Size**: スペーシング、ボーダーラディウス、ストローク、深度、ブラー
- **Responsive**: デバイス幅、ボーダー幅

### 2. CSS変数の定義 (tokens/variables.css)

`src/tokens/variables.css`にCSS変数として定義します。

```css
@layer base {
  :root {
    /* Color - Text */
    --sds-color-text-brand-on-brand-tertiary: #2c2c2c;
    --sds-color-text-brand-on-brand: #f5f5f5;
    --sds-color-text-brand-tertiary: #757575;
    --sds-color-text-default-default: #1e1e1e;
    --sds-color-text-default-tertiary: #b3b3b3;
    --sds-color-text-default-secondary: #757575;

    /* Color - Background */
    --sds-color-background-default-default: #ffffff;
    --sds-color-background-default-secondary: #f5f5f5;
    --sds-color-background-brand-default: #2c2c2c;
    --sds-color-background-brand-secondary: #e6e6e6;
    --sds-color-background-brand-tertiary: #f5f5f5;
    --sds-color-background-neutral-tertiary: #e3e3e3;

    /* Typography */
    --sds-typography-title-hero-size: 72px;
    --sds-typography-subtitle-size-base: 32px;
    --sds-typography-body-size-medium: 16px;
    --sds-typography-body-size-small: 14px;
    --sds-typography-heading-size-base: 24px;

    /* Size - Space */
    --sds-size-space-100: 4px;
    --sds-size-space-200: 8px;
    --sds-size-space-300: 12px;
    --sds-size-space-400: 16px;
    --sds-size-space-600: 24px;
    --sds-size-space-800: 32px;

    /* Size - Radius */
    --sds-size-radius-100: 4px;
    --sds-size-radius-200: 8px;
    --sds-size-radius-400: 16px;
    --sds-size-radius-full: 9999px;
  }

  .dark {
    /* Dark mode overrides will be added here */
  }
}

body {
  color: var(--sds-color-text-default-default);
  background: var(--sds-color-background-default-default);
  font-family: var(--sds-typography-body-font-family), sans-serif;
}
```

### 3. Tailwind設定の更新

#### 3-1. tailwind.config.ts（最小限の設定）

Tailwind CSS v4では、設定ファイルは最小限にし、ダークモードのみを定義します。

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
};

export default config;
```

#### 3-2. tokensに@themeブロックを追加

CSS変数をTailwindユーティリティクラスとして使用できるように、`src/tokens/theme.css`を作成します。

```css
/* src/tokens/theme.css */

@theme {
  /* Colors - Text */
  --color-text-brand-on-brand-tertiary: var(--sds-color-text-brand-on-brand-tertiary);
  --color-text-brand-on-brand: var(--sds-color-text-brand-on-brand);
  --color-text-brand-tertiary: var(--sds-color-text-brand-tertiary);
  --color-text-default: var(--sds-color-text-default-default);
  --color-text-default-tertiary: var(--sds-color-text-default-tertiary);
  --color-text-default-secondary: var(--sds-color-text-default-secondary);

  /* Colors - Background */
  --color-background-default: var(--sds-color-background-default-default);
  --color-background-default-secondary: var(--sds-color-background-default-secondary);
  --color-background-brand: var(--sds-color-background-brand-default);
  --color-background-brand-secondary: var(--sds-color-background-brand-secondary);
  --color-background-brand-tertiary: var(--sds-color-background-brand-tertiary);

  /* Colors - Border */
  --color-border-default: var(--sds-color-border-default-default);
  --color-border-brand: var(--sds-color-border-brand-default);

  /* Spacing */
  --spacing-100: var(--sds-size-space-100);
  --spacing-200: var(--sds-size-space-200);
  --spacing-300: var(--sds-size-space-300);
  --spacing-400: var(--sds-size-space-400);
  --spacing-600: var(--sds-size-space-600);
  --spacing-800: var(--sds-size-space-800);
  --spacing-1200: var(--sds-size-space-1200);
  --spacing-1600: var(--sds-size-space-1600);

  /* Border radius */
  --radius-100: var(--sds-size-radius-100);
  --radius-200: var(--sds-size-radius-200);
  --radius-400: var(--sds-size-radius-400);
  --radius-full: var(--sds-size-radius-full);

  /* Font family */
  --font-family-body: var(--sds-typography-body-font-family), sans-serif;
  --font-family-heading: var(--sds-typography-heading-font-family), sans-serif;

  /* Font size */
  --font-size-title-hero: var(--sds-typography-title-hero-size);
  --font-size-subtitle: var(--sds-typography-subtitle-size-base);
  --font-size-body-medium: var(--sds-typography-body-size-medium);
  --font-size-body-small: var(--sds-typography-body-size-small);
  --font-size-heading: var(--sds-typography-heading-size-base);

  /* Font weight */
  --font-weight-body-regular: var(--sds-typography-body-font-weight-regular);
  --font-weight-body-strong: var(--sds-typography-body-font-weight-strong);
  --font-weight-heading: var(--sds-typography-heading-font-weight);
}

/* コンテンツスキャン対象を指定 */
@source "./src/**/*.{js,ts,jsx,tsx,mdx}";
```

**重要な変更点（Tailwind CSS v3 → v4）:**
- ✅ JavaScript設定ファイルからCSS-based設定に移行
- ✅ `@theme`ブロックでデザイントークンを定義
- ✅ `@source`ディレクティブでコンテンツスキャン対象を指定
- ✅ `tailwind.config.ts`は最小限（darkModeのみ）

### 4. スタイルのエクスポート

`src/tokens/index.css`で全CSSをまとめてエクスポート：

```css
/* src/tokens/index.css */
@import "./variables.css";
@import "./styles.css";
@import "./theme.css";
```

利用側プロジェクトでは以下のようにimport：

```tsx
// app/layout.tsx
import "@awesome/design-system/styles.css";
```

## リファレンス情報

以下は、セットアップ完了後に継続的に参照する情報です。

### Tailwindユーティリティクラスの使用方法

セットアップ後、以下のようなTailwindクラスが使用可能になります：

#### カラー
```tsx
// テキストカラー
<p className="text-text-default">Default text</p>
<p className="text-text-brand-on-brand">Brand text</p>

// 背景カラー
<div className="bg-background-default">Default background</div>
<div className="bg-background-brand">Brand background</div>

// ボーダーカラー
<div className="border border-border-default">Default border</div>
```

#### スペーシング
```tsx
<div className="p-400">16px padding</div>
<div className="m-200">8px margin</div>
<div className="gap-300">12px gap</div>
```

#### ボーダーラディウス
```tsx
<div className="rounded-200">8px radius</div>
<div className="rounded-400">16px radius</div>
<div className="rounded-full">9999px radius</div>
```

#### タイポグラフィ
```tsx
<h1 className="font-heading text-title-hero font-title-hero">
  Hero Title
</h1>
<p className="font-body text-body-medium font-body-regular">
  Body text
</p>
```

### CSS変数の直接使用

CSS変数を直接使用することもできます：

```tsx
<div style={{ color: 'var(--sds-color-text-default-default)' }}>
  Direct CSS variable usage
</div>
```

## デザイントークンの命名規則

### 接頭辞
- `--sds-`: Simple Design System の略

### カテゴリ
- `color-`: カラー関連
- `typography-`: タイポグラフィ関連
- `size-`: サイズ関連（スペーシング、ラディウスなど）
- `responsive-`: レスポンシブ設定

### 階層構造
```
--sds-{category}-{subcategory}-{property}
例: --sds-color-text-default-default
    --sds-size-space-400
    --sds-typography-body-size-medium
```

## ダークモード対応

ダークモードは`.dark`クラスで定義します：

```css
.dark {
  --sds-color-text-default-default: #ffffff;
  --sds-color-background-default-default: #1e1e1e;
  /* その他のダークモード用変数 */
}
```

コンポーネント側では自動的に切り替わります：

```tsx
<div className="text-text-default bg-background-default">
  {/* ダークモード時は自動的にダークカラーに切り替わる */}
</div>
```

## 更新手順

### Variables（変数）の更新

Figmaのデザイントークンが更新された場合：

1. MCPツールで最新の変数を取得
2. `src/tokens/variables.css`のCSS変数を更新
3. 必要に応じて`src/tokens/theme.css`を更新
4. 変更をコミット

## Figma Styles (Text Styles)

Figma Stylesは、デザイントークン(Variables)の上位レイヤーで、複数のプロパティを組み合わせた再利用可能なスタイル定義です。

### スタイルの種類

#### Typography Styles

- **Body Base**: 標準的な本文テキスト
  - Font: Inter Regular 16px
  - Weight: 400
  - Line Height: 1.4

- **Body Base Single Line**: 行間なしの本文テキスト
  - Font: Inter Regular 16px
  - Weight: 400
  - Line Height: 1.0

- **Body Small**: 小さめの本文テキスト
  - Font: Inter Regular 14px
  - Weight: 400
  - Line Height: 1.4

- **Body Strong**: 太字の本文テキスト
  - Font: Inter Semi Bold 16px
  - Weight: 600
  - Line Height: 1.4

- **Heading**: 見出しテキスト
  - Font: Inter Semi Bold 24px
  - Weight: 600
  - Line Height: 1.2

- **Subtitle**: サブタイトルテキスト
  - Font: Inter Regular 32px
  - Weight: 400
  - Line Height: 1.2

- **Title Hero**: ヒーロータイトル
  - Font: Inter Bold 72px
  - Weight: 700
  - Line Height: 1.2

### スタイルの使用方法

#### CSSクラスとして使用

`src/tokens/styles.css`で定義されたスタイルクラスを使用:

```tsx
<p className="text-body-base">標準的な本文テキスト</p>
<p className="text-body-small">小さめのテキスト</p>
<p className="text-body-strong">太字のテキスト</p>
<h1 className="text-title-hero">ヒーローセクションのタイトル</h1>
<h2 className="text-heading">見出し</h2>
<p className="text-subtitle">サブタイトル</p>
```

#### Tailwindユーティリティで個別に指定

```tsx
<p className="font-body text-body-medium font-body-regular leading-body">
  個別のプロパティを組み合わせる
</p>
```

#### 組み合わせ例

```tsx
<div className="text-body-base text-text-default">
  スタイル + カラーの組み合わせ
</div>

<h1 className="text-title-hero text-text-brand-on-brand bg-background-brand">
  ブランドカラーのヒーロータイトル
</h1>
```

### Variables vs Styles の使い分け

- **Variables**: 個々のプロパティ値（色、サイズ、フォントウェイトなど）
  - `text-text-default` (色)
  - `p-400` (padding)
  - `rounded-200` (border radius)

- **Styles**: 複数のプロパティを組み合わせた完成形
  - `text-body-base` (font-family + font-size + font-weight + line-height)
  - `text-heading` (font-family + font-size + font-weight + line-height)

**推奨される使い方:**
```tsx
// ✅ Good: StylesとVariablesを組み合わせる
<p className="text-body-base text-text-default-secondary">
  セカンダリカラーの本文テキスト
</p>

// ❌ Avoid: すべて個別に指定する
<p className="font-body text-body-medium font-body-regular leading-body text-text-default-secondary">
  冗長な指定
</p>
```

## 関連ファイル

- `src/tokens/variables.css` - CSS変数定義
- `src/tokens/styles.css` - スタイルクラス定義
- `src/tokens/theme.css` - @themeブロック（Tailwind統合）
- `src/tokens/index.css` - 全CSS統合export
- `tailwind.config.ts` - Tailwind設定
- `doc/figma_import_component.md` - Figmaコンポーネント取り込みガイド
