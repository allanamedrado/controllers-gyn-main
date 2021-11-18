
const { age, date } = require('../../lib/date')
const member = require('../models/member')
const Member = require('../models/member')

//exportar funcoes

module.exports = {
    index(req, res){
        Member.all(function(members) {
            return res.render("members/index", { members})
        
        })
    },
    create(req, res){
        return res.render("members/create")
    },
    show(req, res){    
        Member.find(req.params.id, function(member) {
            if (!member) return res.send("member not found!")

            member.birth = date(member.birth).birthDay
            console.log(member)
        })
        return res.render("members/show", { member: member })
    },
    edit(req, res){

        Member.find(req.params.id, function(member) {
            if (!member) return res.send("member not found!")

            member.birth = date(member.birth).iso
        })
        return res.render("members/show", { member })
    
    
        
    },
    post(req, res){
        
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }

        Member.create(req.body, function(member) {
            return res.redirect(`/members/${member.id}`)

        })

    },
    put(req, res){
        const keys = Object.keys(req.body)

        for (const key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }

    
        Member.update(req.body, function() {
            return res.redirect(`/members/${req.body.id}`)
        })
        
        
        
    },
    delete(req, res){
        Member.delete(req.body.id, function() {
            return res.redirect(`/members`)
        })
    },
}

