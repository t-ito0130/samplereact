import type { NextApiRequest, NextApiResponse } from "next";

// 取得する情報のインターフェース
export interface Book {
  id: string;
  title: string;
  pageCount: number | null;
}

// Google Books API からキーワードに関する書籍を検索する関数
export async function getData(keyword: string): Promise<Book[]> {
  const res = await fetch(
    "https://www.googleapis.com/books/v1/volumes?q=" +
      encodeURIComponent(keyword)
  );
  const jsonData = await res.json();
  return jsonData.items.map((elem: any) => {
    return {
      id: elem.id,
      title: elem.volumeInfo.title,
      pageCount: elem.pageCount || null,
    };
  });
}

// Next.jsのAPI定義
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // const data = await getData();
  const data = await getData("ドラえもん");
  res.status(200).json(data);
}
