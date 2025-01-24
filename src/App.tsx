import { useMemo, useState } from "react"
import { InventoryItem } from "./types"
import { Plus } from "lucide-react";

function App() {
  const [items, setItems] = useState<InventoryItem[]>([
    { id: '1', name: 'Laptop', category: 'Electronics', quantity: 5, price: 999.99, description: 'High-performance laptop' },
    { id: '2', name: 'Desk Chair', category: 'Furniture', quantity: 12, price: 199.99, description: 'Ergonomic office chair' },
    { id: '3', name: 'Printer', category: 'Electronics', quantity: 3, price: 299.99, description: 'Color laser printer' },
  ]);

  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const uniqueCategories = new Set(items.map(item => item.category));
    return ['all', ...Array.from(uniqueCategories)];
  }, [items]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-2xl font-bold text-gray-800">
            <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
            <button
              onClick={() => {
                setEditingItem(null);
                setIsModalOpen(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-800 transition-colors"
            >
              <Plus size={20} />
              Add Item
            </button>
          </div>

          <div className="flex gap-4 mb-6">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
