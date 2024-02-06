import { useQuery } from "@tanstack/react-query";
import ContentItem from "../ContentItem";
import { getBoards } from "@/apis/server";
import { IContent } from "@/types/server";
import { ConfigProvider, Pagination } from "antd";
import { useEffect, useState } from "react";

const ContentList = ({ searchType, searchParam }: { searchType?: string; searchParam?: string }) => {
  const [nowPage, setNowPage] = useState(0);
  const [total, setTotal] = useState(0);
  const { data: boards, isLoading } = useQuery<IContent>({
    queryKey: ["boards", nowPage, searchType, searchParam],
    queryFn: () => getBoards(nowPage, searchType, searchParam),
  });

  useEffect(() => {
    if (boards) setTotal(boards.totalElements);
  }, [boards]);

  const changePage = (page: number) => {
    setNowPage(page - 1);
  };
  return (
    <>
      {isLoading && (
        <div className="fixed flex justify-center items-center top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] ">
          <img src="/loading.gif" alt="loading" className="mx-auto" />
        </div>
      )}
      <div className="flex flex-col justify-center items-center pb-48">
        <div className="flex flex-wrap mx-auto px-4 font-Pretendard justify-center md:justify-normal w-full">
          {boards && boards.list.map((content, index) => <ContentItem content={content} key={index} hasJoinButton />)}
        </div>
        <div className="flex justify-center bg-gray-400  h-12 items-center rounded-lg mt-10">
          <ConfigProvider
            theme={{
              components: {
                Pagination: {
                  itemBg: "#000",
                  itemActiveBg: "#000",
                  itemSize: 40,
                  fontSize: 20,
                  colorText: "#fff",
                  borderRadius: 50,
                },
              },
            }}
          >
            <Pagination total={total} onChange={changePage} />
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

export default ContentList;
