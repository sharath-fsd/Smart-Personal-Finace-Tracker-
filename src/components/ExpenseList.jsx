import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  SearchIcon,
  FilterIcon,
  TrashIcon,
  CalendarIcon,
  DollarSignIcon,
} from "lucide-react";
import { format } from "date-fns";
const categories = [
  { value: "all", label: "All Categories" },
  { value: "food", label: "Food & Dining", color: "bg-orange-500" },
  { value: "transport", label: "Transportation", color: "bg-blue-500" },
  { value: "entertainment", label: "Entertainment", color: "bg-purple-500" },
  { value: "shopping", label: "Shopping", color: "bg-pink-500" },
  { value: "bills", label: "Bills & Utilities", color: "bg-red-500" },
  { value: "healthcare", label: "Healthcare", color: "bg-green-500" },
  { value: "other", label: "Other", color: "bg-gray-500" },
];
export const ExpenseList = ({ expenses, onDeleteExpense }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const filteredAndSortedExpenses = useMemo(() => {
    let filtered = expenses.filter((expense) => {
      const matchesSearch =
        expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || expense.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "amount":
          return b.amount - a.amount;
        case "category":
          return a.category.localeCompare(b.category);
        case "date":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  }, [expenses, searchTerm, selectedCategory, sortBy]);
  const getCategoryColor = (category) => {
    const cat = categories.find((c) => c.value === category);
    return cat?.color || "bg-gray-500";
  };
  const getCategoryLabel = (category) => {
    const cat = categories.find((c) => c.value === category);
    return cat?.label || category;
  };
  const totalAmount = filteredAndSortedExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );
  return (
    <Card className="bg-gradient-card shadow-finance border-0">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FilterIcon className="h-5 w-5 text-primary" />
            Expense History
          </div>
          <Badge variant="outline" className="text-lg font-semibold px-3 py-1">
            Total: ₹{totalAmount.toFixed(2)}
          </Badge>
        </CardTitle>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  <div className="flex items-center gap-2">
                    {category.value !== "all" && (
                      <div
                        className={`w-3 h-3 rounded-full ${category.color}`}
                      />
                    )}
                    {category.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="amount">Amount</SelectItem>
              <SelectItem value="category">Category</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        {filteredAndSortedExpenses.length === 0 ? (
          <div className="text-center py-12">
            <DollarSignIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              No expenses found
            </h3>
            <p className="text-muted-foreground">
              {expenses.length === 0
                ? "Add your first expense to get started!"
                : "Try adjusting your search or filter criteria."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAndSortedExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 rounded-lg bg-background/50 border hover:bg-background/80 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`w-4 h-4 rounded-full ${getCategoryColor(expense.category)}`}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground truncate">
                        {expense.description}
                      </h4>
                      <Badge variant="secondary" className="text-xs">
                        {getCategoryLabel(expense.category)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarIcon className="h-3 w-3" />
                      {format(new Date(expense.date), "MMM dd, yyyy")}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-bold text-expense">
                      ₹{expense.amount.toFixed(2)}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteExpense(expense.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
