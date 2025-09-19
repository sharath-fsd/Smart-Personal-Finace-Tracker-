import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUpIcon, TrendingDownIcon, CreditCardIcon, CalendarIcon, PieChartIcon } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, subMonths } from "date-fns";

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface ExpenseDashboardProps {
  expenses: Expense[];
}

const categories = [
  { value: "food", label: "Food & Dining", color: "#f97316" },
  { value: "transport", label: "Transportation", color: "#3b82f6" },
  { value: "entertainment", label: "Entertainment", color: "#8b5cf6" },
  { value: "shopping", label: "Shopping", color: "#ec4899" },
  { value: "bills", label: "Bills & Utilities", color: "#ef4444" },
  { value: "healthcare", label: "Healthcare", color: "#22c55e" },
  { value: "other", label: "Other", color: "#6b7280" },
];

export const ExpenseDashboard = ({ expenses }: ExpenseDashboardProps) => {
  const currentMonth = new Date();
  const lastMonth = subMonths(currentMonth, 1);

  const stats = useMemo(() => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    const currentMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= startOfMonth(currentMonth) && expenseDate <= endOfMonth(currentMonth);
    });
    
    const lastMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= startOfMonth(lastMonth) && expenseDate <= endOfMonth(lastMonth);
    });

    const currentMonthTotal = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const lastMonthTotal = lastMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const monthlyChange = lastMonthTotal > 0 ? ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100 : 0;

    return {
      totalExpenses,
      currentMonthTotal,
      lastMonthTotal,
      monthlyChange,
      totalTransactions: expenses.length,
      averageExpense: expenses.length > 0 ? totalExpenses / expenses.length : 0,
    };
  }, [expenses, currentMonth, lastMonth]);

  const categoryData = useMemo(() => {
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    return categories
      .map(category => ({
        name: category.label,
        value: categoryTotals[category.value] || 0,
        color: category.color,
      }))
      .filter(item => item.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [expenses]);

  const dailyExpenseData = useMemo(() => {
    if (expenses.length === 0) return [];

    const last30Days = eachDayOfInterval({
      start: subMonths(new Date(), 1),
      end: new Date()
    });

    return last30Days.map(day => {
      const dayStr = format(day, 'yyyy-MM-dd');
      const dayExpenses = expenses.filter(expense => expense.date === dayStr);
      const total = dayExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      
      return {
        date: format(day, 'MMM dd'),
        amount: total,
      };
    });
  }, [expenses]);

  const topCategories = categoryData.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card shadow-finance border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
                <p className="text-2xl font-bold text-foreground">₹{stats.totalExpenses.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-gradient-primary rounded-full">
                 ₹
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-finance border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">This Month</p>
                <p className="text-2xl font-bold text-foreground">₹{stats.currentMonthTotal.toFixed(2)}</p>
                <div className="flex items-center gap-1 mt-1">
                  {stats.monthlyChange >= 0 ? (
                    <TrendingUpIcon className="h-4 w-4 text-red-500" />
                  ) : (
                    <TrendingDownIcon className="h-4 w-4 text-green-500" />
                  )}
                  <span className={`text-xs font-medium ${stats.monthlyChange >= 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {Math.abs(stats.monthlyChange).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="p-3 bg-gradient-success rounded-full">
                <CalendarIcon className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-finance border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Transactions</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalTransactions}</p>
              </div>
              <div className="p-3 bg-primary rounded-full">
                <CreditCardIcon className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-finance border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg. Expense</p>
                <p className="text-2xl font-bold text-foreground">₹{stats.averageExpense.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-accent rounded-full">
                <PieChartIcon className="h-6 w-6 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card className="bg-gradient-card shadow-finance border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-primary" />
              Spending by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            {categoryData.length > 0 ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-80 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <PieChartIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No data to display</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="bg-gradient-card shadow-finance border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUpIcon className="h-5 w-5 text-primary" />
              Top Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topCategories.length > 0 ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topCategories} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      interval={0}
                    />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {topCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-80 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <TrendingUpIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No data to display</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Daily Spending Trend */}
      <Card className="bg-gradient-card shadow-finance border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUpIcon className="h-5 w-5 text-primary" />
            Daily Spending Trend (Last 30 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {dailyExpenseData.length > 0 ? (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyExpenseData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <TrendingUpIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No data to display</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};