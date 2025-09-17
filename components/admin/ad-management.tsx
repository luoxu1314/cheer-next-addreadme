"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2, Eye } from "lucide-react";

interface Ad {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  published: boolean;
  adClient: string;
  adContact: string;
  adStartDate: string;
  adEndDate: string;
  adStatus: "pending" | "active" | "expired" | "rejected";
  adPrice: number;
  adDuration: number;
  createdAt: string;
}

export function AdManagement() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);

  // 表单状态
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    coverImage: "",
    adClient: "",
    adContact: "",
    adStartDate: new Date().toISOString().split("T")[0],
    adDuration: 6,
    adPrice: 2000,
    adStatus: "pending",
  });

  useEffect(() => {
    fetchAds();
  }, [statusFilter]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("adminToken");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchAds = async () => {
    try {
      const response = await fetch(`/api/admin/ads?status=${statusFilter}`, {
        headers: getAuthHeaders(),
      });

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      const data = await response.json();
      setAds(data.ads || []);
    } catch (error) {
      console.error("Failed to fetch ads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingAd
        ? `/api/admin/ads?id=${editingAd.id}`
        : "/api/admin/ads";
      const method = editingAd ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(formData),
      });

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      if (response.ok) {
        setIsCreateOpen(false);
        setEditingAd(null);
        resetForm();
        fetchAds();
      } else {
        const errorData = await response.json();
        alert(errorData.error || "操作失败");
      }
    } catch (error) {
      console.error("Failed to save ad:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定要删除这个广告吗？")) return;

    try {
      const response = await fetch(`/api/admin/ads?id=${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      if (response.ok) {
        fetchAds();
      } else {
        const errorData = await response.json();
        alert(errorData.error || "删除失败");
      }
    } catch (error) {
      console.error("Failed to delete ad:", error);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/ads?id=${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ adStatus: status }),
      });

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      if (response.ok) {
        fetchAds();
      } else {
        const errorData = await response.json();
        alert(errorData.error || "状态更新失败");
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const checkExpiredAds = async () => {
    try {
      const response = await fetch("/api/admin/ads", {
        method: "PATCH",
        headers: getAuthHeaders(),
      });

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      if (response.ok) {
        fetchAds();
        alert("过期广告检查完成");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "检查失败");
      }
    } catch (error) {
      console.error("Failed to check expired ads:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      coverImage: "",
      adClient: "",
      adContact: "",
      adStartDate: new Date().toISOString().split("T")[0],
      adDuration: 6,
      adPrice: 2000,
      adStatus: "pending",
    });
  };

  const openEditDialog = (ad: Ad) => {
    setEditingAd(ad);
    setFormData({
      title: ad.title,
      content: ad.content,
      excerpt: ad.excerpt,
      coverImage: ad.coverImage || "",
      adClient: ad.adClient,
      adContact: ad.adContact,
      adStartDate: ad.adStartDate,
      adDuration: ad.adDuration,
      adPrice: ad.adPrice,
      adStatus: ad.adStatus,
    });
    setIsCreateOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-chart-1 hover:bg-chart-1/80";
      case "pending":
        return "bg-chart-2 hover:bg-chart-2/80";
      case "expired":
        return "bg-destructive hover:bg-destructive/80";
      case "rejected":
        return "bg-destructive hover:bg-destructive/80";
      default:
        return "bg-secondary hover:bg-secondary/80";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "已上线";
      case "pending":
        return "待审核";
      case "expired":
        return "已过期";
      case "rejected":
        return "已拒绝";
      default:
        return status;
    }
  };

  if (loading) {
    return <div className="p-4 text-muted-foreground">加载中...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">广告管理</h2>
          <p className="text-muted-foreground">管理校园推广内容</p>
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="pending">待审核</SelectItem>
              <SelectItem value="active">已上线</SelectItem>
              <SelectItem value="expired">已过期</SelectItem>
              <SelectItem value="rejected">已拒绝</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={checkExpiredAds}>
            检查过期
          </Button>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <Button
              asChild
              onClick={() => {
                setEditingAd(null);
                resetForm();
              }}
            >
              <DialogTrigger >
                <Plus className="h-4 w-4 mr-2" />
                创建广告
              </DialogTrigger>
            </Button>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingAd ? "编辑广告" : "创建新广告"}
                </DialogTitle>
                <DialogDescription>
                  填写广告信息，提交后需要审核
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>广告标题</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label>广告描述</Label>
                  <Textarea
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label>详细内容</Label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    rows={6}
                    required
                  />
                </div>
                <div>
                  <Label>封面图片URL</Label>
                  <Input
                    value={formData.coverImage}
                    onChange={(e) =>
                      setFormData({ ...formData, coverImage: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>客户名称</Label>
                    <Input
                      value={formData.adClient}
                      onChange={(e) =>
                        setFormData({ ...formData, adClient: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label>联系方式</Label>
                    <Input
                      value={formData.adContact}
                      onChange={(e) =>
                        setFormData({ ...formData, adContact: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="adStartDate">开始日期</Label>
                    <Input
                      id="adStartDate"
                      type="date"
                      value={formData.adStartDate}
                      onChange={(e) => {
                        try {
                          setFormData({
                            ...formData,
                            adStartDate: new Date(e.target.value).toISOString().split("T")[0],
                          });
                        } catch (error) { }
                      }}
                      required
                    />
                  </div>
                  <div>
                    <Label>时长（月）</Label>
                    <Select
                      value={formData.adDuration.toString()}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          adDuration: parseInt(value),
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6个月</SelectItem>
                        <SelectItem value="12">12个月</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>价格（分）</Label>
                    <Input
                      type="number"
                      value={formData.adPrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          adPrice: parseInt(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateOpen(false)}
                  >
                    取消
                  </Button>
                  <Button type="submit">{editingAd ? "更新" : "创建"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 广告列表 */}
      <div className="grid gap-4">
        {ads.map((ad) => (
          <Card key={ad.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{ad.title}</CardTitle>
                  <CardDescription>{ad.adClient}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(ad.adStatus)}>
                    {getStatusText(ad.adStatus)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">价格：</span>¥{ad.adPrice / 100}
                </div>
                <div>
                  <span className="font-medium">时长：</span>
                  {ad.adDuration}个月
                </div>
                <div>
                  <span className="font-medium">开始：</span>
                  {format(new Date(ad.adStartDate), "yyyy-MM-dd")}
                </div>
                <div>
                  <span className="font-medium">结束：</span>
                  {format(new Date(ad.adEndDate), "yyyy-MM-dd")}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" asChild>
                  <a href={`/blog/${ad.slug}`} target="_blank">
                    <Eye className="h-4 w-4 mr-1" />
                    预览
                  </a>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEditDialog(ad)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  编辑
                </Button>
                {ad.adStatus === "pending" && (
                  <Button
                    size="sm"
                    onClick={() => handleStatusUpdate(ad.id, "active")}
                  >
                    上线
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(ad.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  删除
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {ads.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">暂无广告</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
