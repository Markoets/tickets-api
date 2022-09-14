const actors = [
    { id: 1, name: "Tom Cruise", gender: "Male", age: 60 },
    { id: 2, name: "Emma Roberts", gender: "Female", age: 31 },
    { id: 3, name: "Brad pit", gender: "Male", age: 58 },
    { id: 4, name: "Thomas Doherty", gender: "Male", age: 27 },
    { id: 5, name: "Zoe Saldana", gender: "Female", age: 44 },
    { id: 6, name: "Thomas Mann", gender: "Male", age: 30 },
    { id: 7, name: "Jon Hamm", gender: "Male", age: 51 },
    { id: 8, name: "Robert De niro", gender: "Male", age: 79 },
    { id: 9, name: "Ray Liotta", gender: "Male", age: 67 },
    { id: 10, name: "Joe Pesci", gender: "Male", age: 79 },
]

exports.getAll = (req, res) => {
  res.send(actors)
}



exports.createNew = (req, res) => {  //Create
   const length =  actors.push(req.body)
   actors[length-1] = {id:actors[length-2].id+1,...actors[length-1]}
    res.status(201).json(actors[length-1])
}
exports.getById = function (req, res) {    //Read
    if (!(parseInt(req.params.id) > 0)) {
        res.status(400).send({ error: "ID must be a positive integer" })
        return
    }
    let result = actors.find(x => x.id === parseInt(req.params.id))
    if (typeof (result) === 'undefined') {
        res.status(404).send({ error: "Actor not found." })
        return
    }
    res.send(result)
}
exports.editById = function (req, res) {  //Update
    if (!(parseInt(req.params.id) > 0)) {
        res.status(400).send({ error: "ID must be a positive integer" })
        return
    }

    const index = actors.findIndex(x => x.id === parseInt(req.params.id))

    if (index ===-1) {
        res.status(404).send({ error: "Actor not found." })
        return
    }

    actors[index]={...actors[index],...req.body}

    res.status(200).json(actors[index])   

}
exports.deleteById = function (req, res) {   //Delete
    if (!(parseInt(req.params.id) > 0)) {
        res.status(400).send({ error: "ID must be a positive integer" })
        return
    }
    const index = actors.findIndex(x => x.id === parseInt(req.params.id))

    if (index ===-1) {
        res.status(404).send({ error: "Actor not found." })
        return
    }
    actors.splice(index,1)
    res.status(204).send()
}