"use client";
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy, // 水平方向のソート戦略に変更
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type React from "react";
import { useEffect, useState } from "react";

// アイテムの型定義
interface Item {
  id: string;
  content: string;
}

// ソート可能なアイテムコンポーネントのプロップス
interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

// オーバーレイアイテムコンポーネントのプロップス
interface ItemOverlayProps {
  children: React.ReactNode;
}

// メインアプリケーションコンポーネント
const App: React.FC = () => {
  // クライアントサイドレンダリングを制御するためのステート
  const [mounted, setMounted] = useState(false);

  // クライアントサイドでマウント後に実行
  useEffect(() => {
    setMounted(true);
  }, []);

  // ドラッグ可能なアイテムのリスト
  const [items, setItems] = useState<Item[]>([
    { id: "1", content: "アイテム 1" },
    { id: "2", content: "アイテム 2" },
    { id: "3", content: "アイテム 3" },
    { id: "4", content: "アイテム 4" },
    { id: "5", content: "アイテム 5" },
    { id: "6", content: "アイテム 6" },
    { id: "7", content: "アイテム 7" },
    { id: "8", content: "アイテム 8" },
    { id: "9", content: "アイテム 9" },
    { id: "10", content: "アイテム 10" },
  ]);

  // 現在ドラッグ中のアイテムID
  const [activeId, setActiveId] = useState<string | null>(null);

  // ドラッグのセンサー設定
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // ドラッグ開始時の処理
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  // ドラッグ終了時の処理
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  // 現在ドラッグ中のアイテムを取得
  const activeItem = activeId
    ? items.find((item) => item.id === activeId)
    : null;

  // サーバーサイドレンダリング時の表示
  if (!mounted) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">水平ドラッグ機能サンプル</h1>
        <div className="overflow-x-auto rounded p-4">
          <div className="flex space-x-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 border rounded shadow min-w-24 flex-shrink-0"
              >
                {item.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 min-w-[1200px] mx-auto">
      <h1 className="text-2xl font-bold mb-4">水平ドラッグ機能サンプル</h1>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToHorizontalAxis]}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={horizontalListSortingStrategy} // 水平方向のソート戦略を使用
        >
          {/* スクロール可能な水平コンテナ */}
          <div className="overflow-x-auto rounded ">
            <div className="flex space-x-4 min-w-full">
              {items.map((item) => (
                <SortableItem key={item.id} id={item.id}>
                  {item.content}
                </SortableItem>
              ))}
            </div>
          </div>
        </SortableContext>

        {/* DragOverlayコンポーネント */}
        <DragOverlay adjustScale={true} zIndex={100}>
          {activeId && activeItem ? (
            <ItemOverlay>{activeItem.content}</ItemOverlay>
          ) : null}
        </DragOverlay>
      </DndContext>

      <div className="mt-4 text-sm text-gray-600">
        ※ 画面幅を超えるとスクロールして表示できます
      </div>
    </div>
  );
};

// ソート可能なアイテムコンポーネント - 水平レイアウト用にスタイリング調整
const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-4 border rounded shadow cursor-move min-w-24 flex-shrink-0"
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
};

// ドラッグ中に表示されるオーバーレイコンポーネント
const ItemOverlay: React.FC<ItemOverlayProps> = ({ children }) => {
  return (
    <div className="bg-white p-4 border rounded shadow cursor-move min-w-24 flex-shrink-0 border-[#EC3056] text-[#EC3056]">
      {children}
    </div>
  );
};

export default App;
