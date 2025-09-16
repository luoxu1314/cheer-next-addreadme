import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Building, CreditCard, Users, Clock, Award, Tag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

// Subject 类型定义，与getSubjects服务返回的数据结构匹配
interface Subject {
  id: string;
  name: string;
  department: string;
  credit: number;
  category: string;
  tuitionHour: number;
  tuitionHourDetail: string;
  courses: Array<{id: string}>;
  tooOld: boolean;
  unopenTerms: any[];
  createdAt: Date;
  updatedAt: Date;
}

interface SubjectCardProps {
  subject: Subject;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject }) => {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/subjects/${subject.id}`);
  };

  // 格式化日期
  const formatDate = (dateString: Date) => {
    try {
      return format(new Date(dateString), 'yyyy-MM-dd');
    } catch (error) {
      return 'N/A';
    }
  };

  // 判断是否为公共选修课（根据ID中是否包含'-'符号）
  const isPublicElective = subject.id.includes('-');

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl group border-0 shadow-md bg-white dark:bg-card">
      {/* 卡片头部渐变背景 */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-secondary"></div>
      
      <CardHeader className="pt-6 pb-4 relative">
        {/* 课程名称 */}
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {subject.name}
          </CardTitle>
          {isPublicElective && (
            <Badge className="ml-auto bg-primary text-primary-foreground">
              公共选修
            </Badge>
          )}
        </div>
        
        {/* 课程代码 */}
        <CardDescription className="mt-1 text-sm font-mono tracking-wider text-muted-foreground">
          {subject.id}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 pb-4">
        {/* 院系信息 */}
        <div className="flex items-center text-sm text-muted-foreground gap-2">
          <Building className="h-4 w-4 text-primary shrink-0" />
          <span>{subject.department || '未指定'}</span>
        </div>

        {/* 学分信息 */}
        <div className="flex items-center text-sm text-muted-foreground gap-2">
          <CreditCard className="h-4 w-4 text-primary shrink-0" />
          <span>{subject.credit} 学分</span>
        </div>

        {/* 课程类别 */}
        {subject.category && (
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <Tag className="h-4 w-4 text-primary shrink-0" />
            <span>{subject.category}</span>
          </div>
        )}

        {/* 学时信息 */}
        <div className="flex items-center text-sm text-muted-foreground gap-2">
          <Clock className="h-4 w-4 text-primary shrink-0" />
          <span>{subject.tuitionHour} 学时</span>
        </div>

        {/* 班级数量 */}
        <div className="flex items-center text-sm text-muted-foreground gap-2">
          <Users className="h-4 w-4 text-primary shrink-0" />
          <span>{subject.courses?.length || 0} 个班级</span>
        </div>
      </CardContent>

      <Separator className="my-1" />

      <CardFooter className="flex justify-between items-center pt-3 pb-6 px-6">
        <div className="text-xs text-muted-foreground">
          更新于 {formatDate(subject.updatedAt || subject.createdAt)}
        </div>
        <Button 
          variant="default" 
          size="sm" 
          onClick={handleViewDetails}
        >
          查看详情
        </Button>
      </CardFooter>
    </Card>
  );
};