# メモ帳アプリ

[**デプロイ先のURLはこちら**](https://memo-app-one-teal.vercel.app/)

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

## テスト

このプロジェクトにはJestとReact Testing Libraryによるテストが設定されています。以下のコマンドでテストを実行できます。

```bash
npm test
```

## Vercelへのデプロイ

このリポジリはVercelにデプロイされています。`master` ブランチにプッシュすると、自動的にデプロイが実行されます。

もし手動でご自身のVercelアカウントにデプロイを行う場合は、以下の手順に従ってください。

1.  **Vercelにログイン**
    [Vercel](https://vercel.com/) にアクセスし、GitHubアカウントでログインします。

2.  **プロジェクトのインポート**
    - ダッシュボードで「Add New...」から「Project」を選択します。
    - 「Import Git Repository」の画面で、このリポジリ (`Shigeppon/memo-app`) をフォークするか、ご自身の同名リポジリをインポートします。

3.  **デプロイ**
    - フレームワークは自動的に「Next.js」として認識されます。
    - そのまま「Deploy」ボタンを押すと、デプロイが開始されます。

## Dockerでのセットアップと起動

アプリケーションをDockerコンテナとしてビルドし、実行することができます。

### Dockerコマンドを使用する場合

1.  **Dockerイメージのビルド**
    プロジェクトのルートディレクトリで以下のコマンドを実行します。

    ```bash
    docker build -t memo-app .
    ```

2.  **Dockerコンテナの起動**
    ビルドしたイメージを使ってコンテナを起動します。

    ```bash
    docker run -p 3000:3000 memo-app
    ```
    ブラウザで `http://localhost:3000` を開くと、アプリケーションが表示されます。

### Docker Composeを使用する場合

`docker-compose.yml`ファイルがプロジェクトのルートディレクトリに存在することを確認してください。

1.  **Docker Composeでビルドと起動**
    以下のコマンドを実行すると、イメージのビルド（必要に応じて）とコンテナの起動が同時に行われます。

    ```bash
    docker-compose up --build
    ```
    ブラウザで `http://localhost:3000` を開くと、アプリケーションが表示されます。

2.  **コンテナの停止**
    コンテナを停止し、関連するリソースを削除するには、以下のコマンドを実行します。

    ```bash
    docker-compose down
    ```