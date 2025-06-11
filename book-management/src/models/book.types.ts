interface BookCreateData {
  title: string;
  author: string;
  year: number;
  description?: string;
  coverImageUrl?: string;
}

interface BookRow extends BookCreateData {
  id: number;
  user_id: number;
}

interface DeleteBookRow {
  id: number;
  cover_image_url?: string;
}

type BookUpdateData = Partial<BookCreateData>;

type DeletedBookId = { deletedBookId: number };

export type { BookCreateData, BookUpdateData, DeletedBookId, BookRow, DeleteBookRow };
