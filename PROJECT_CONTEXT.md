# 📚 PROJECT_CONTEXT.md
> **Bắt buộc đọc** trước khi bắt đầu làm việc. Cập nhật sau mỗi session.

---

## 🎯 Tổng quan

**Tên:** ベトナム旅行ガイド (Vietnam Travel Guide)  
**Mục tiêu:** App hướng dẫn du lịch Việt Nam (Hội An & Đà Nẵng) dành cho người Nhật lần đầu đến Việt Nam.  
**Platform:** Figma Make (React + Vite, chạy sẵn trên `$PORT`, hot reload)  
**Build:** `npm run build` — không dùng `pnpm` (chưa install)

---

## 🛠️ Tech Stack

| Thành phần | Công nghệ | Ghi chú |
|---|---|---|
| UI Framework | **React 19** + TypeScript 5.7 | |
| Build | **Vite 8** | `npm run build` |
| Styling | **Tailwind CSS v4** | Import qua `@import 'tailwindcss'` trong `index.css` |
| Icons | **lucide-react ^1.29** | |
| Font | **Inter** + **Noto Sans JP** | Google Fonts, import trong `index.css` |
| Path alias | `@/` → `src/` | Cấu hình trong `vite.config.ts` |
| TTS | **Web Speech API** | Built-in trình duyệt, `vi-VN` locale |

---

## 📁 Cấu trúc File

```
src/
├── types.ts                  ← Tab type, sky color tokens, image URL constants
├── utils/
│   └── tts.ts                ← speak() — Web Speech API wrapper
├── components/
│   ├── Atoms.tsx             ← SectionHeading, Card, SpeakButton, TipBox
│   └── Cards.tsx             ← PhraseCard, AddressCard, OrderCard,
│                                ExpressionCard, FoodCard, SpotCard
├── pages/
│   ├── HomePage.tsx          ← Hero, category nav, phrase preview, food preview
│   ├── KaiwaPage.tsx         ← 6 sub-section hội thoại
│   ├── GourmetPage.tsx       ← 3 món ăn đặc sản + phrase gọi món
│   ├── SpotsPage.tsx         ← Điểm tham quan Hội An / Đà Nẵng
│   └── ChuiPage.tsx          ← Lưu ý an toàn khi đến Việt Nam
├── App.tsx                   ← Navigation shell (sidebar, bottom nav, drawer)
├── index.css                 ← Global CSS, Tailwind import, animations
└── main.tsx                  ← React entrypoint
```

---

## 🗺️ Luồng Navigation

```
Tab Type: 'home' | 'kaiwa' | 'gourmet' | 'spots' | 'chui'

App (activeTab state)
├── 'home'    → HomePage    → onNavigate(tab) để link sang tab khác
├── 'kaiwa'   → KaiwaPage   → local state: section ('phrases'|'address'|'order'|'expressions'|'bargain'|'emergency')
├── 'gourmet' → GourmetPage → static (không có sub-nav)
├── 'spots'   → SpotsPage   → local state: area ('hoian'|'danang')
└── 'chui'    → ChuiPage    → static (không có sub-nav)
```

**Layout responsive:**
- `lg+` (≥1024px): Sidebar cố định trái + top header + main content
- `md` (768-1023px): Top header + horizontal tab bar ở trên
- `<md` (mobile): Top header + bottom nav bar + hamburger → drawer

**Scroll behavior:** `useEffect(() => scrollTo(top), [activeTab])` trong `App.tsx`

---

## 🎨 Design System

### Color Palette — `sky` (defined in `src/types.ts`)
```ts
sky[50]  = '#f7fbff'  // background nhạt nhất
sky[100] = '#eaf5fd'  // border, card bg
sky[200] = '#d0ebf9'  // border hover, shadow color
sky[300] = '#a8d8f0'  // accent nhạt
sky[400] = '#7bc3e8'  // icon, reading text
sky[500] = '#4eabdc'  // primary — button active, link, gradient
sky[600] = '#2b8fbe'  // gradient darker, CTA bg
sky[700] = '#1a6f99'  
sky[800] = '#0f5275'  // darkest
```

**Màu bổ sung (dùng inline):**
- Amber `#f59e0b → #fcd34d` — gradient card Gourmet, TipBox
- Purple `#8b5cf6 → #c4b5fd` — gradient card Spots
- Red `#ef4444 → #fca5a5` — gradient card Chui
- `#fff1f2` — taxi warning bg

### Typography
- Font: `'Inter', 'Noto Sans JP', sans-serif` (cả hai bắt buộc cho JP text)
- `-webkit-font-smoothing: antialiased`
- Heading: `text-2xl font-bold text-slate-800`
- Body: `text-sm text-slate-500 leading-relaxed`

### Animations (defined in `index.css`)
```css
.anim-up  → fadeInUp (0.4s) — card xuất hiện từ dưới lên
.anim-in  → fadeIn   (0.35s) — page transition (fade)
.d1-.d6   → animation-delay từ 0.04s đến 0.29s
```
**Cách dùng delay trên card:** `style={{ animationDelay: \`${delay}s\` } as React.CSSProperties}`

### Gradient chuẩn
```ts
// Primary button/nav active
`linear-gradient(135deg, ${sky[500]}, ${sky[400]})`

// CTA section
`linear-gradient(135deg, ${sky[600]}, ${sky[400]})`

// Number badge on OrderCard
`linear-gradient(135deg, ${sky[500]}, ${sky[400]})`
```

### Border radius convention
- Card container: `rounded-2xl` (16px)
- Button pill: `rounded-full`
- Badge/tag: `rounded-full` (nhỏ) hoặc `rounded-xl`
- Image container trong card: `rounded-2xl overflow-hidden`

### Shadow convention
- Card default: `shadow-sm border border-sky-100`
- Card hover: `hover:shadow-md hover:border-sky-200`
- Card featured (FoodCard): `hover:shadow-lg hover:-translate-y-1`
- Active button: `boxShadow: \`0 4px 12px ${sky[200]}\``

---

## 🧱 Component Reference

### `src/components/Atoms.tsx`
| Component | Props | Dùng khi |
|---|---|---|
| `SectionHeading` | `children`, `sub?` | Tiêu đề đầu mỗi section |
| `Card` | `children`, `className?`, `style?` | Container trắng chuẩn |
| `SpeakButton` | `text`, `size?` | Nút phát âm TTS — tự quản lý state speaking |
| `TipBox` | — | Hộp vàng tip về "ạ" |

### `src/components/Cards.tsx`
| Component | Props chính | Dùng tại |
|---|---|---|
| `PhraseCard` | `vn`, `reading`, `meanings[]`, `delay?` | KaiwaPage - phrases |
| `AddressCard` | `emoji`, `vn`, `jp`, `bg`, `delay` | KaiwaPage - address |
| `OrderCard` | `num`, `vn`, `reading`, `count`, `delay` | KaiwaPage - order |
| `ExpressionCard` | `vn`, `jp`, `delay`, `sub?` | KaiwaPage - expressions |
| `FoodCard` | `num`, `name`, `desc`, `img`, `delay` | GourmetPage |
| `SpotCard` | `name`, `nameJp`, `area`, `rating`, `time`, `desc`, `img`, `mapUrl`, `delay` | SpotsPage |

### `src/utils/tts.ts`
```ts
speak(text: string)  // Phát âm text bằng vi-VN, rate=0.85
// Tự chọn voice vi-VN nếu có, fallback về default
// Cancel utterance trước đó trước khi phát mới
```

---

## 🔊 TTS (Text-to-Speech)

- Engine: **Web Speech API** (built-in browser)
- Locale: `vi-VN`, rate `0.85`, pitch `1.0`
- **Lưu ý:** Tất cả text tiếng Việt trong app đã bỏ dấu (chuyển về ASCII) vì file tsx dùng single-quote string có thể bị lỗi build với ký tự đặc biệt. TTS vẫn phát được vì Web Speech API nhận cả dạng không dấu.
- `SpeakButton`: toggle speaking state, auto reset sau `max(1200, text.length * 200)` ms

---

## 📄 Các trang & nội dung hiện có

### HomePage
- Hero banner (Hội An ảnh Unsplash)
- 4 category card → navigate đến tab tương ứng
- Preview 4 phrase + nút phát âm
- Preview 3 food thumbnail
- Taxi teaser → ChuiPage
- TipBox

### KaiwaPage (6 tab)
1. **基本フレーズ** — 6 phrase cơ bản + TipBox
2. **呼び方** — 5 cách xưng hô (Anh/Chú/Chị/Cô/Bà)
3. **注文するとき** — 6 OrderCard (1-6 phần) + 4 order phrase
4. **よく使う表現** — 6 ExpressionCard (hỏi giá, vị trí, toilet...)
5. **値切り・買物** — tip mặc cả + 6 phrase
6. **緊急・その他** — số cấp cứu 113/115/114 + 6 phrase khẩn + 4 weather phrase

### GourmetPage
- 3 FoodCard: Mì Quảng, Cao Lầu, Cơm Gà (có giá tham khảo)
- 4 order phrase với SpeakButton
- Photo banner Hội An
- CTA gradient

### SpotsPage (2 area)
- **ホイアン (4 spots):** Chùa Cầu, Phố Cổ, Mỹ Sơn, Bãi Biển An Bàng
- **ダナン (2 spots):** Cầu Rồng, Ngũ Hành Sơn
- Mỗi SpotCard có: ảnh, rating, thời gian, mô tả, Google Maps link
- Tips section theo từng area

### ChuiPage
- Card cảnh báo taxi + GreenSM recommendation
- 6 general tips (tiền, nước, SIM, thời tiết...)

---

## 🖼️ Image URLs (Unsplash, defined in `src/types.ts`)

| Biến | Nội dung |
|---|---|
| `HERO_IMG` | Hội An lantern street (1200×600) |
| `MI_QUANG` | Mì Quảng (600×400) |
| `CAO_LAU` | Cao Lầu (600×400) |
| `COM_GA` | Cơm Gà (600×400) |
| `HOI_AN_STREET` | Phố cổ Hội An (800×500) |
| `HOI_AN_BRIDGE` | Chùa Cầu (600×400) |
| `DA_NANG_BRIDGE` | Cầu Rồng (600×400) |
| `MY_SON` | Mỹ Sơn (600×400) |
| `MARBLE_MTN` | Ngũ Hành Sơn (600×400) |
| `AN_BANG_BEACH` | Bãi biển An Bàng (600×400) |

---

## ⚠️ Lưu ý khi code

1. **Dấu tiếng Việt trong string:** Dùng double-quote `"` hoặc đảm bảo không có apostrophe trong single-quote string → tránh lỗi build.
2. **Tailwind v4:** Không cần `tailwind.config.js`. Tùy chỉnh theme dùng `@theme` trong `index.css`.
3. **Path alias:** Luôn dùng `@/` thay vì relative path `../../`.
4. **`pnpm` chưa install:** Dùng `npm run build` / `npm run dev`.
5. **`animationDelay` cần cast:** `style={{ animationDelay: \`${delay}s\` } as React.CSSProperties}`.
6. **SpeakButton `e.stopPropagation()`:** Bắt buộc để tránh bubble event lên card cha.
7. **Image lazy loading:** Tất cả `<img>` trong card dùng `loading="lazy"`.

---

## 📅 Session Log

### Session 1 — 2026-08-07
**Đã làm:**
- Đọc và phân tích toàn bộ project ban đầu (735 dòng App.tsx monolith)
- Xác định các điểm cần hoàn thiện với user
- Split App.tsx thành cấu trúc modular:
  - `src/types.ts` — types & constants
  - `src/utils/tts.ts` — TTS utility
  - `src/components/Atoms.tsx` — atom components
  - `src/components/Cards.tsx` — card components
  - `src/pages/*.tsx` — 5 page components
  - `src/App.tsx` — navigation shell only (~200 dòng)
- Thêm tính năng mới:
  - ✅ **TTS hoạt động** — Web Speech API `vi-VN`
  - ✅ **Trang 観光スポット** mới (SpotsPage) — 6 điểm tham quan, Google Maps links
  - ✅ **Mở rộng KaiwaPage** — thêm tab 値切り・買物 và 緊急・その他
  - ✅ **Scroll-to-top** khi đổi tab
  - ✅ **Xóa Language switcher** (không cần thiết)
  - ✅ **Fix navigation** — 観光 card giờ link đúng sang SpotsPage
  - ✅ **Giá tham khảo** thêm vào FoodCard
- Build: ✅ 238KB JS, 30KB CSS, 0 errors

**Còn có thể cải thiện:**
- [ ] Skeleton loading cho ảnh
- [ ] PWA / offline support
- [ ] Search/filter trong KaiwaPage
- [ ] Bookmark phrase yêu thích (localStorage)

### Session 2 — 2026-08-07
**Đã làm:**
- Thêm `reading` prop vào `AddressCard` và `ExpressionCard` trong `Cards.tsx`
- Khôi phục **dấu tiếng Việt đầy đủ** trên tất cả mẫu câu (trước đó bị strip về ASCII)
- Thêm **Katakana phonetic reading** hiển thị dưới text tiếng Việt tại:
  - `Atoms.tsx` — TipBox examples
  - `HomePage.tsx` — phrase preview list (4 câu)
  - `KaiwaPage.tsx` — tất cả 6 section (phrases/address/order/expressions/bargain/emergency)
  - `GourmetPage.tsx` — order phrases (4 câu)
  - `SpotsPage.tsx` — spot names với dấu đúng (Chùa Cầu, Phố Cổ Hội An, Thánh địa Mỹ Sơn...)
- Katakana hiển thị dưới Vietnamese, trên Japanese, màu `sky[500]` (xanh nhạt), size `text-xs`
- Build: ✅ 240KB JS, 32KB CSS, 0 errors

**Lưu ý kỹ thuật thêm vào:**
- Vietnamese có dấu dùng được hoàn toàn trong TSX double-quote string và JSX text content
- Pattern hiển thị chuẩn cho phrase item:
  ```tsx
  <div className="font-bold text-slate-800 text-sm">{p.vn}</div>
  <div className="text-xs font-medium mt-0.5" style={{ color: sky[500] }}>{p.reading}</div>
  <div className="text-xs text-slate-400 mt-0.5">{p.jp}</div>
  ```

