# Claude Code Demo — Dev Task Tracker

Claude Code がバグ修正・機能追加をリアルタイムで行うデモです。

## セットアップ / 起動

依存パッケージのインストールは不要です。ローカルサーバーで起動します。

```bash
# Node.js (npx serve を都度ダウンロード、インストール不要)
npm start
#  → http://localhost:3000 を開く

# Python しかない環境では
npm run serve:python
#  → http://localhost:3000 を開く
```

> ファイルを直接 `open index.html` でも動きますが、`file://` だと一部ブラウザで挙動が変わるため、ローカルサーバー経由を推奨します。
> プレゼン資料は http://localhost:3000/slides.html で開けます。

| コマンド | 内容 |
|----------|------|
| `npm start` / `npm run dev` | `npx serve` で静的配信（ポート3000） |
| `npm run serve:python` | Python の `http.server` で配信（Node不要） |

## デモシナリオ

### Step 0: アプリを開いて動作確認

上記の `npm start` で起動し、ブラウザで `http://localhost:3000` を開く。
バグを体験してもらう：

1. タスクを追加 → **入力欄がクリアされない（Bug 1）**
2. タスクを完了にする → **Done カウンターが変わらない（Bug 2）**
3. タスクを削除する → **別のタスクが消える（Bug 3）**

---

### Step 1: Claude Code にバグを修正させる

```
claude "このアプリのバグを全部直して"
```

Claude Code が `CLAUDE.md` を読み込み、`app.js` の3つのバグを自動修正します。

---

### Step 2: 機能追加を依頼する

```
claude "フィルター機能と検索機能を追加して"
```

Claude Code がフィルタータブとテキスト検索を実装します。

---

### Step 3: さらに発展させる（オプション）

```
claude "タスクをローカルストレージに保存するようにして"
claude "タスクの優先度を色分けしてドラッグ&ドロップで並び替えられるようにして"
claude "ダークモードとライトモードの切り替えを追加して"
```

---

## 含まれるバグ（詳細）

| # | 場所 | 内容 |
|---|------|------|
| 1 | `app.js:addTask()` | タスク追加後に `input.value = ''` が抜けている |
| 2 | `app.js:toggleComplete()` | `updateStats()` の呼び出しが抜けている |
| 3 | `app.js:deleteTask()` | `findIndex` が `id + 1` を検索するオフバイワンエラー |

## Claude Code の主な機能（このデモで体験できること）

- **コードベースの自動理解** — `CLAUDE.md` を読んでコンテキストを把握
- **マルチファイル編集** — 複数ファイルを横断して変更を適用
- **バグの特定と修正** — コードを読んでバグを見つけ、修正案を実行
- **機能追加** — 既存コードを壊さずに新機能を追加
- **インタラクティブな対話** — 曖昧な指示でも確認しながら実装
