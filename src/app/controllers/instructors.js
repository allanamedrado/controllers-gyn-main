const { date } = require("../../lib/date")
const db = require('../../config/db')

//exportar funcoes

module.exports = {
    index(req, res){
        return res.render("instructors/index")
    },
    create(req, res){
        return res.render("instructors/create")
    },
    show(req, res){    

        return res.render("instructors/show", { instructor })
    },
    edit(req, res){
        return
        
    },
    post(req, res){
        
        const query = `
            INSERT INTO instructors (                
                avatar_url,
                name,
                birth,
                gender,
                services,                
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const values = [            
            req.body.avatar_url,
            req.body.name,            
            date(req.body.birth).iso,
            req.body.gender,
            req.body.services,
            date(Date.now()).iso
        ]
        
       db.query(query, values, function(err, results){
           if(err) return res.send("Database Error")

           return res.redirect(`/instructors/${results.rows[0].id}`)
       })

    },
    put(req, res){
        const keys = Object.keys(req.body)

        for (const key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }

        let {avatar_url, birth, name, services, gender} = req.body

        
        return res.redirect('/instructors')
        
    },
    delete(req, res){
        return
    },
}

