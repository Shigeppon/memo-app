"use client";

import { useState, useEffect } from "react";

// メモのデータ構造を定義
interface Memo {
  id: string;
  title: string;
  content: string;
}

export default function Home() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [activeMemoId, setActiveMemoId] = useState<string | null>(null);

  // 初回レンダリング時にローカルストレージからメモを読み込む
  useEffect(() => {
    const savedMemos = localStorage.getItem("memos");
    if (savedMemos) {
      setMemos(JSON.parse(savedMemos));
    }
  }, []);

  // memos配列が変更されるたびにローカルストレージに保存
  useEffect(() => {
    // 最初の読み込み時や空の配列の場合は保存しない
    if (memos.length > 0 || localStorage.getItem("memos")) {
      localStorage.setItem("memos", JSON.stringify(memos));
    }
  }, [memos]);

  // 新しいメモを作成する関数
  const handleNewMemo = () => {
    const newMemo: Memo = {
      id: Date.now().toString(),
      title: "新しいメモ",
      content: "",
    };
    setMemos([newMemo, ...memos]);
    setActiveMemoId(newMemo.id);
  };

  // メモを削除する関数
  const handleDeleteMemo = (idToDelete: string) => {
    setMemos(memos.filter((memo) => memo.id !== idToDelete));
    if (activeMemoId === idToDelete) {
      setActiveMemoId(null);
    }
  };

  // アクティブなメモの内容が変更されたときにmemos配列を更新する関数
  const handleMemoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setMemos(
      memos.map((memo) =>
        memo.id === activeMemoId ? { ...memo, [name]: value } : memo
      )
    );
  };

  // 表示するアクティブなメモを取得
  const activeMemo = memos.find((memo) => memo.id === activeMemoId);

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* サイドバー */}
      <aside className="w-64 bg-white p-4 border-r border-gray-200 flex flex-col">
        <button
          onClick={handleNewMemo}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mb-4"
        >
          新しいメモ
        </button>
        <div className="flex-grow overflow-y-auto">
          <ul>
            {memos.map((memo) => (
              <li
                key={memo.id}
                className={`p-2 rounded cursor-pointer mb-2 ${memo.id === activeMemoId ? "bg-blue-100" : "hover:bg-gray-200"
                  }`}
                onClick={() => setActiveMemoId(memo.id)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold truncate">{memo.title || "無題のメモ"}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // 親要素のonClickイベントを発火させない
                      handleDeleteMemo(memo.id);
                    }}
                    className="text-red-500 hover:text-red-700 ml-2 text-xs font-semibold"
                  >
                    削除
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* メインコンテンツ */}
      <main className="flex-1 p-8">
        {activeMemo ? (
          <div className="flex flex-col h-full">
            <input
              type="text"
              name="title"
              value={activeMemo.title}
              onChange={handleMemoChange}
              placeholder="タイトル"
              className="text-2xl font-bold p-2 mb-4 bg-white border border-gray-300 rounded text-black"
            />
            <textarea
              name="content"
              value={activeMemo.content}
              onChange={handleMemoChange}
              placeholder="ここにメモを入力してください.."
              className="flex-grow p-4 border border-gray-300 rounded text-black"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-gray-500">メモを選択するか、新しいメモを作成してください。</p>
          </div>
        )}
      </main>
    </div>
  );
}