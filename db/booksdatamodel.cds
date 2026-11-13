namespace db.books;
type BooksAgeGroup : String enum{
    kids = 'KIDS';
    Adults = 'ADULTS';
}

entity books {
    key id : UUID;
        title : String;
        author : String;
        price : Decimal(10, 2);
        publishedDate: DateTime;
        digitalCopy : Boolean;
        booksAgeGroup : BooksAgeGroup;
}