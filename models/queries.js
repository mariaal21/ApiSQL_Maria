const { getAllAuthors } = require("./author")

const queries = {
    getEntriesByEmail: `
    SELECT e.title,e.content,e.date,e.category,a.name,a.surname,a.image
    FROM entries AS e
    INNER JOIN authors AS a
    ON e.id_author=a.id_author
    WHERE a.email=$1
    ORDER BY e.title;`,


    getAllEntriesQuery:
        `SELECT * FROM entries`,


    createEntryQuery:
        `INSERT INTO entries (title, content, id_author, category)
    VALUES ($1, $2, (SELECT id_author FROM authors WHERE email=$3), $4)`,

    deleteEntryQuery:
        ` DELETE FROM entries 
    WHERE id_entry = $1`,

    updateEntryQuery:
        `   UPDATE entries
    SET title = $1, content = $2
    WHERE id_entry = $3`,


    getAllAuthors: `SELECT  id_author, name, surname, email, image
        FROM authors
        ORDER BY surname;`,

    getAuthorByEmail: ` SELECT id_author, name, surname, email, image        
            FROM authors                        
            WHERE email = $1;`,

    createAuthor: ` INSERT INTO authors (name, surname, email, image )
    VALUES ( $1, $2, $3, $4 );`,


    updateAuthor: ` UPDATE authors 
    SET name = ($1),
        surname = ($2),
        email = ($3),
        image = ($4)
        WHERE id_author = ($5);`,

deleteAuthor: ` DELETE FROM authors 
WHERE id_author = ($1);`
}





module.exports = queries