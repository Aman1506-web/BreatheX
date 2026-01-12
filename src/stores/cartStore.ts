import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  image: string;
  size: string;
  quantity: number;
  discount: number;
  addedAt?: number;
}

interface CartStore {
  // State
  items: CartItem[];
  isHydrated: boolean;

  // Guest cart actions
  addItem: (item: Omit<CartItem, 'quantity' | 'addedAt'>) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;

  // Computed values
  getTotal: () => number;
  getSubtotal: () => number;
  getTotalSavings: () => number;
  getItemCount: () => number;

  // Sync actions
  setItems: (items: CartItem[]) => void;
  setHydrated: (state: boolean) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isHydrated: false,

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.id === item.id && i.size === item.size
          );

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.size === item.size
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }

          return {
            items: [
              ...state.items,
              { ...item, quantity: 1, addedAt: Date.now() },
            ],
          };
        });
      },

      removeItem: (id, size) => {
        set((state) => ({
          items: state.items.filter((i) => !(i.id === id && i.size === size)),
        }));
      },

      updateQuantity: (id, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, size);
          return;
        }

        set((state) => ({
          items: state.items.map((i) =>
            i.id === id && i.size === size ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getSubtotal: () => {
        return get().getTotal();
      },

      getTotalSavings: () => {
        return get().items.reduce(
          (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      setItems: (items) => {
        set({ items });
      },

      setHydrated: (state) => {
        set({ isHydrated: state });
      },
    }),
    {
      name: 'breathex-cart-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
