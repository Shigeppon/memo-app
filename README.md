# メモ帳アプリ

[**デプロイ先のURLはこちら**](https://memo-app-six-rho.vercel.app/)

ブラウザのローカルストレージを使用して、メモを永続的に保存することができるシンプルなメモ帳アプリケーションです。

## 主な機能

- **メモの管理**: 新しいメモの作成、編集、削除が可能です。
- **複数メモ対応**: サイドメニューから複数のメモを切り替えて管理できます。
- **自動保存**: メモのタイトルや内容への変更は、リアルタイムで自動的にローカルストレージに保存されます。
- **レスポンシブデザイン**: シンプルなUIで、直感的に操作できます。

## 技術スタック

このプロジェクトは以下の技術を使用して構築されています。

- [Next.js](https://nextjs.org/) - Reactフレームワーク
- [React](https://react.dev/) - UIライブラリ
- [TypeScript](https://www.typescriptlang.org/) - JavaScriptへの静的型付け
- [Tailwind CSS](https://tailwindcss.com/) - CSSフレームワーク

## セットアップと起動方法

1.  **リポジトリをクローン**
    ```bash
    git clone https://github.com/Shigeppon/memo-app.git
    ```

2.  **プロジェクトディレクトリに移動**
    ```bash
    cd memo-app
    ```

3.  **依存関係をインストール**
    ```bash
    npm install
    ```

4.  **開発サーバーを起動**
    ```bash
    npm run dev
    ```

5.  **ブラウザで確認**
    ブラウザで `http://localhost:3000` を開くと、アプリケーションが表示されます。