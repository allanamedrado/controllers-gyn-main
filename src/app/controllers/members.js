const { age, date } = require("../../lib/date")

//exportar funcoes

module.exports = {
    index(req, res){
        return res.render("members/index")
    },
    create(req, res){
        return res.render("members/create")
    },
    show(req, res){    

        return res.render("members/show")
    },
    edit(req, res){
        return
        
    },
    post(req, res){
        const keys = Object.keys(req.body)

        for (const key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }
        
        return res.redirect('/members')
        

    },
    put(req, res){
        const keys = Object.keys(req.body)

        for (const key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }

        let {avatar_url, birth, name, services, gender} = req.body

        
        return res.redirect('/members')
        
    },
    delete(req, res){
        return
    },
}

