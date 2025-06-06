interface BookCreateData {
  title: string;
  author: string;
  year: number;
  description?: string;
  coverImageUrl?: string;
}

interface BookData extends BookCreateData {
  id: number;
}

type BookUpdateData = Partial<BookCreateData>;

type DeletedBookId = { deletedBookId: number };

export type { BookCreateData, BookData, BookUpdateData, DeletedBookId };
