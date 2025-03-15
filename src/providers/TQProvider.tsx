"use client";

import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 데이터 갱신 빈도 제어
        refetchOnWindowFocus: false // 불팔요한 API 호출 감소
      }
    }
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

// SSR 환경, 요청마다 새로운 QueryClient 생성 -> 데이터 격리 보장
// 클라이언트 환경, 단일 인스턴스를 재사용 -> 캐싱의 효율성을 향상

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function TQProviders({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
