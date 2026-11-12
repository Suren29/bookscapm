namespace db.books;
entity books {
    key id : UUID;
        title : String;
        author : String;
        price : Decimal(10, 2);
        publishedDate: DateTime;
        digitalCopy : Boolean
}