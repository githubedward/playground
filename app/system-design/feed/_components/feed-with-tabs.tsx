"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { NaiveFeed } from "./feed-naive";
import { OptimizedFeed } from "./feed-optimized";

export function FeedWithTabs() {
  const [activeTab, setActiveTab] = useState("naive");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="naive">Naive</TabsTrigger>
        <TabsTrigger value="optimized">Optimized</TabsTrigger>
      </TabsList>

      <TabsContent value="naive">
        <NaiveFeed />
      </TabsContent>

      <TabsContent value="optimized">
        <OptimizedFeed />
      </TabsContent>
    </Tabs>
  );
}
