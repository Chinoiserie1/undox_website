"use client";
import Preview from "@/components/preview/preview";
import BorderFrame from "@/components/borderFrame";
import MintSection from "@/components/mintSection";
import DetailSection from "@/components/detailSection";
import MetaData from "@/components/metaData";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BorderFrame />
        <main id="preview" className="min-h-full">
          <div className="p-20 lg:container lg:mx-auto lg:max-w-6xl">
            <Preview />
            <MintSection />
          </div>
          <DetailSection />
          <MetaData />
        </main>
      </QueryClientProvider>
    </>
  );
}
