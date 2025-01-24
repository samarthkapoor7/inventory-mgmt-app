import { useMemo, useState } from "react"
import { InventoryItem, SortDirection } from "./types"
import { AlertCircle, Pencil, Plus } from "lucide-react";

function App() {
  const [items, setItems] = useState<InventoryItem[]>([
    { id: '1', name: 'Laptop', category: 'Electronics', quantity: 5, price: 999.99, description: 'High-performance laptop' },
    { id: '2', name: 'Desk Chair', category: 'Furniture', quantity: 12, price: 199.99, description: 'Ergonomic office chair' },
    { id: '3', name: 'Printer', category: 'Electronics', quantity: 3, price: 299.99, description: 'Color laser printer' },
  ]);

  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const categories = useMemo(() => {
    const uniqueCategories = new Set(items.map(item => item.category));
    return ['all', ...Array.from(uniqueCategories)];
  }, [items]);

  const filteredAndSortedItems = useMemo(() => {
    let filtered = items;
    if (selectedCategory !== 'all') {
      filtered = items.filter(item => item.category === selectedCategory);
    }

    return filtered.sort((a, b) => {
      const sortValue = sortDirection === 'asc' ? 1 : -1;
      return (a.quantity - b.quantity) * sortValue;
    });
  }, [items, selectedCategory, sortDirection]);

  

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
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

            <button
              onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="border rounded-lg px-4 py-2 hover:bg-gray-50"
            >
              Sort by Quantity ({sortDirection === 'asc' ? '↑' : '↓'})
            </button>
          </div>

          <div className="overflow-x-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedItems.map(item => (
                  <tr key={item.id} className={item.quantity < 10 ? 'bg-red-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {item.quantity < 10 && (
                          <AlertCircle size={16} className="text-red-500 mr-2" />
                        )}
                        {item.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">${item.price.toFixed(2)}</td>
                    <td className="px-6 py-4">{item.description}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingItem(item);
                            setIsModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >

                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
