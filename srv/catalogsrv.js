const cds = require('@sap/cds');
const {books} = cds.entities;

module.exports  = srv =>{

const db = cds.db;

//Read OPeration
/*     srv.on('READ', 'BooksSet', async (req,resp) => {
        results = [];
        results = await db.run([
            SELECT.from(books).where({id : req.data.id})
        ]);
        return results;
    }); */

    srv.before('INSERT', 'BooksSet', req=>{
        if(req.data.price < 0 )
            req.error(400, 'Price can not be negative')
    });
//Create Operation
   srv.on('INSERT', 'BooksSet', async (req,resp) => {
        results = [];
        results = await db.run([
            INSERT.into(books).entries(req.data)
        ])
        .then((resolve,reject)=>{
            if(resolve)
                return req.data;
            else
                return req.error(400, 'Failed to insert records');
                
        })
        .catch(err=>{
            return req.error(500, 'Server is down, Try again'+err.toString());
        })
        return results;
   });
   
//Update Operation
   srv.on('UPDATE', 'BooksSet', async (req,resp) => {
        results = [];
        results = await db.run([
            UPDATE(books).set(req.data).where({id: req.data.id})
        ])
        .then((resolve,reject)=>{
            if(resolve)
                return req.data;
            else
                return req.error(400, 'Failed to update records');
                
        })
        .catch(err=>{
            return req.error(500, 'Server is down now, Try again'+err.toString());
        })
        return results;
   });  
srv.after('UPDATE', 'BooksSet', (data) => {
    console.log(`Books Update: ${data.id}`);
});
   
//Delete Operation   
   srv.on('DELETE', 'BooksSet', async (req) => {
        results = await db.run([
            DELETE.from(books).where({id: req.data.id})
        ]);
   })
}
