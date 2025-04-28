import { NextResponse } from "next/server";
import type { ThreadAdminMessagePaginationType } from "./types";

// ダミーデータ生成関数
const generateDummyData = (
  page: number,
  limit: number
): ThreadAdminMessagePaginationType => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const totalItems = 100; // 総アイテム数

  const results = Array.from(
    { length: Math.min(limit, totalItems - startIndex) },
    (_, index) => {
      const id = startIndex + index + 1;
      const now = new Date().toISOString();

      return {
        id,
        content: `メッセージ内容 ${id}`,
        link: `https://example.com/message/${id}`,
        message_status: Math.random() > 0.5,
        matching_status_flg: Math.floor(Math.random() * 3),
        matching_status_at: now,
        button_display: Math.random() > 0.5,
        parent_thread: Math.floor(Math.random() * 1000),
        thread: {
          id: Math.floor(Math.random() * 1000),
          title: `スレッドタイトル ${id}`,
          created_at: now,
          updated_at: now,
        },
        matching_user:
          Math.random() > 0.5
            ? {
                id: Math.floor(Math.random() * 1000),
                name: `ユーザー名 ${id}`,
                email: `user${id}@example.com`,
                created_at: now,
                updated_at: now,
              }
            : null,
        offer: {
          id: Math.floor(Math.random() * 1000),
          title: `オファータイトル ${id}`,
          description: `オファー説明 ${id}`,
          created_at: now,
          updated_at: now,
        },
        to_user: Math.floor(Math.random() * 1000),
        create_at: now,
        update_at: now,
        interview_schedule: {
          id: Math.floor(Math.random() * 1000),
          date: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          time: `${Math.floor(Math.random() * 24)}:${Math.floor(
            Math.random() * 60
          )
            .toString()
            .padStart(2, "0")}`,
          created_at: now,
          updated_at: now,
        },
        matching_review_id: Math.floor(Math.random() * 1000),
      };
    }
  );

  return {
    count: totalItems,
    next: endIndex < totalItems,
    previous: page > 1,
    results,
  };
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get("page") || "1", 10);
    const limit = Number.parseInt(searchParams.get("limit") || "20", 10);

    const data = generateDummyData(page, limit);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
