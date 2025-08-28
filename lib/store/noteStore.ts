import { NewNoteValues } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

//початковий стан draft з типізацією
const initialtDraft: NewNoteValues = {
  title: "",
  content: "",
  tag: "Todo",
};

// Типи
interface NoteDraftState {
  draft: NewNoteValues; // сама чернетка (об'єкт, що містить тимчасові дані форми нотатки з title/content/tag).
  setDraft: (newDraft: NewNoteValues) => void; //функція для оновлення полів чернетки.
  clearDraft: () => void; // функція, щоб очистити (скинути) чернетку до початкового стану.
}

// zustand-хук useNoteDraft
export const useNoteDraft = create<NoteDraftState>()(
  persist(
    (set) => {
      return {
        draft: initialtDraft,
        setDraft: (newData: NewNoteValues) => set({ draft: newData }),
        clearDraft: () => set({ draft: initialtDraft }),
      };
    },
    {
      name: "draft",
      partialize: (state) => {
        return { draft: state.draft };
      },
    }
  )
);
