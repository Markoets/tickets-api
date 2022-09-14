const tickets = [
    { id: 1, name: "Top gun", cast: "Tom Cruise, Jennifer Connelly, Jon Hamm", price: 15.99 },
    { id: 2, name: "The Invitation", cast: "Nathalie Emmanuel, Thomas Doherty", price: 13.99 },
    { id: 3, name: "Avatar", cast: "Sam Worthington, Zoe Saldana, Sigourney Weaver", price: 10.99 },
    { id: 4, name: "André Rieu in Dublin", cast: "André Rieu", price: 25.99 },
    { id: 5, name: "Cinema Classics: Goodfellas", cast: "Robert De Niro, Joe Pesci, Ray Liota", price: 15.99 },
    { id: 6, name: "Beast", cast: "Idris Elba, Sharlto Copley", price: 19.99 },
    { id: 7, name: "Bullet Train", cast: "Brad Pitt, Aaron Taylor-Johnson, Sandra Bullock, Hiroyuki Sanada", price: 11.99 },
    { id: 8, name: "About Fate", cast: "Emma Roberts, Thomas Mann", price: 18.99 },
    { id: 9, name: "After Ever Happy", cast: "Hero Fiennes Tiffin, Josephine Langford, Louise Lombard", price: 16.99 },
    { id: 10, name: "Nope", cast: "Barbie Ferreira, Keke Palmer, Michael Wincott", price: 12.99 },
]

exports.getAll = (req, res) => {
  res.send(tickets)
}



exports.createNew = (req, res) => {  //Create
   const length =  tickets.push(req.body)
   tickets[length-1] = {id:tickets[length-2].id+1,...tickets[length-1]}
    res.status(201).json(tickets[length-1])
}
exports.getById = function (req, res) {    //Read
    if (!(parseInt(req.params.id) > 0)) {
        res.status(400).send({ error: "ID must be a positive integer" })
        return
    }
    let result = tickets.find(x => x.id === parseInt(req.params.id))
    if (typeof (result) === 'undefined') {
        res.status(404).send({ error: "Ticket not found." })
        return
    }
    res.send(result)
}
exports.editById = function (req, res) {  //Update
    if (!(parseInt(req.params.id) > 0)) {
        res.status(400).send({ error: "ID must be a positive integer" })
        return
    }

    const index = tickets.findIndex(x => x.id === parseInt(req.params.id))

    if (index ===-1) {
        res.status(404).send({ error: "Ticket not found." })
        return
    }

    tickets[index]={...tickets[index],...req.body}

    res.status(200).json(tickets[index])   

}
exports.deleteById = function (req, res) {   //Delete
    if (!(parseInt(req.params.id) > 0)) {
        res.status(400).send({ error: "ID must be a positive integer" })
        return
    }
    const index = tickets.findIndex(x => x.id === parseInt(req.params.id))

    if (index ===-1) {
        res.status(404).send({ error: "Ticket not found." })
        return
    }
    tickets.splice(index,1)
    res.status(204).send()
}