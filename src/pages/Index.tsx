import { useState } from "react";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { ExpenseDashboard } from "@/components/ExpenseDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusIcon, BarChart3Icon, ListIcon, DollarSignIcon } from "lucide-react";
import heroImage from "@/assets/finance-hero.jpg";

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

// Mock data for demonstration
const initialExpenses: Expense[] = [
  {
    id: "1",
    amount: 45.50,
    category: "food",
    description: "Lunch at Italian restaurant",
    date: "2024-01-15",
  },
  {
    id: "2",
    amount: 120.00,
    category: "shopping",
    description: "Winter jacket from department store",
    date: "2024-01-14",
  },
  {
    id: "3",
    amount: 25.00,
    category: "transport",
    description: "Uber ride to downtown",
    date: "2024-01-14",
  },
  {
    id: "4",
    amount: 85.75,
    category: "bills",
    description: "Monthly internet bill",
    date: "2024-01-13",
  },
  {
    id: "5",
    amount: 32.50,
    category: "entertainment",
    description: "Movie tickets for two",
    date: "2024-01-12",
  },
  {
    id: "6",
    amount: 95.00,
    category: "healthcare",
    description: "Pharmacy prescription",
    date: "2024-01-11",
  },
];

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [activeTab, setActiveTab] = useState("dashboard");

  const addExpense = (newExpense: Omit<Expense, 'id'>) => {
    const expense: Expense = {
      ...newExpense,
      id: Date.now().toString(),
    };
    setExpenses(prev => [expense, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <img 
          src={heroImage} 
          alt="Financial Dashboard" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Take Control of Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Expenses
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Track, analyze, and optimize your spending with our beautiful expense tracker.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => setActiveTab("add")}
                size="lg"
                className="bg-white text-finance-blue hover:bg-white/90 font-semibold shadow-large"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Expense
              </Button>
              <Button 
                onClick={() => setActiveTab("dashboard")}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 font-semibold"
              >
                <BarChart3Icon className="h-5 w-5 mr-2" />
                View Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white shadow-medium border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">

                  ₹               
                    <span className="font-medium text-foreground">Total Spent:</span>
                <span className="font-bold text-expense">₹{totalExpenses.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2">
                <ListIcon className="h-4 w-4 text-primary" />
                <span className="font-medium text-foreground">Transactions:</span>
                <span className="font-bold text-foreground">{expenses.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3Icon className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="add" className="flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              Add Expense
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <ListIcon className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <ExpenseDashboard expenses={expenses} />
          </TabsContent>

          <TabsContent value="add" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <ExpenseForm onAddExpense={addExpense} />
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-6">
            <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-finance-blue text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <DollarSignIcon className="h-6 w-6" />
            <span className="text-xl font-bold">ExpenseTracker</span>
          </div>
          <p className="text-white/80">
            Built with React, TypeScript, and Tailwind CSS
          </p>
          <p className="text-sm text-white/60 mt-2">
            Track your expenses, achieve your financial goals
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;