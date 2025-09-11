"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, User, Users, Building2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { searchAction, type SearchResult } from "@/lib/actions/search";

export function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("student");
  const router = useRouter();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const results = await searchAction(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("搜索失败:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleResultClick = (result: SearchResult) => {
    router.push(`/table/${result.type}/${result.id}`);
  };

  const filteredResults = searchResults.filter(result => {
    if (activeTab === "all") return true;
    return result.type === activeTab;
  });

  return (
    <section id="search" className="py-20 bg-white/50 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            快速查询课表
          </h2>
          <p className="text-lg text-slate-600">
            输入学号、姓名或教室名称，快速查找课程信息
          </p>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader>
            <CardTitle>搜索课程表</CardTitle>
            <CardDescription>
              支持学生、教师、教室三种查询方式
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-6">
              <Input
                type="text"
                placeholder="输入学号、姓名或教室名称..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button 
                onClick={handleSearch} 
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="student">
                  <User className="h-4 w-4 mr-2" />
                  学生
                </TabsTrigger>
                <TabsTrigger value="teacher">
                  <Users className="h-4 w-4 mr-2" />
                  教师
                </TabsTrigger>
                <TabsTrigger value="location">
                  <Building2 className="h-4 w-4 mr-2" />
                  教室
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-4">
                {filteredResults.length > 0 ? (
                  <div className="space-y-2">
                    {filteredResults.map((result) => (
                      <div
                        key={`${result.type}-${result.id}`}
                        className="p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-200"
                        onClick={() => handleResultClick(result)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-slate-900">{result.name}</h3>
                            <p className="text-sm text-slate-600">
                              {result.label} • {result.type === "student" ? "学生" : result.type === "teacher" ? "教师" : "教室"}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            查看课表
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  searchQuery && !isLoading && (
                    <div className="text-center py-8">
                      <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-600">未找到相关结果</p>
                      <p className="text-sm text-slate-500 mt-2">
                        请尝试其他关键词或检查拼写
                      </p>
                    </div>
                  )
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}