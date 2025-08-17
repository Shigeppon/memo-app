開発サーバーはユーザーが手動で起動するため、Geminiは `npm run dev` を実行しない。

--- Commit Message ---
feat: Next.jsアプリケーションのDocker対応

- Next.jsをスタンドアロン出力に設定。
- 効率的なコンテナビルドのためにDockerfileと.dockerignoreを追加。
- ローカル開発を簡素化するためにdocker-composeを導入。
- README.mdにDockerとDocker Composeの手順を追記。
