const { faker } = require('@faker-js/faker');

const locations = [

        { id: 1, country: "Estonia", city: "Tallinn", street: "Solaris" },
        { id: 2, country: "Estonia", city: "Pärnu", street: "Saku" },
        { id: 3, country: "Estonia", city: "Tartu", street: "Ringtee" },
        { id: 4, country: "Estonia", city: "Saaremaa", street: "Kudjape" },
        { id: 5, country: "Estonia", city: "Jõhvi", street: "Puru tee" },
        { id: 6, country: "Estonia", city: "Narva", street: "Tallinna mnt" },
        { id: 7, country: "Estonia", city: "Tallinn", street: "Hobujaam" },
        { id: 8, country: "Estonia", city: "Tallinn", street: "Mustamäe" },
        { id: 9, country: "Estonia", city: "Tallinn", street: "Ülemsite" },
        { id: 10, country: "Estonia", city: "Tallinn", street: "Endla" },
    
]

for (let i = 0; i < 20; i++) {
    // const randomName = `  ${faker.word.adjective()}   ${faker.name.fullName()} ${faker.finance.amount(5, 10, 2, '€') } ` 
    locations.push({id:11+i,
         country:faker.address.country(),
         city:faker.address.cityName(),
         street:faker.address.street()
     })
     console.log(locations);
 }

exports.getAll = (req, res) => {
  res.send(locations)
}



exports.createNew = (req, res) => {  //Create
   const length =  locations.push(req.body)
   locations[length-1] = {id:locations[length-2].id+1,...locations[length-1]}
    res.status(201).json(locations[length-1])
}
exports.getById = function (req, res) {    //Read
    if (!(parseInt(req.params.id) > 0)) {
        res.status(400).send({ error: "ID must be a positive integer" })
        return
    }
    let result = locations.find(x => x.id === parseInt(req.params.id))
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

    const index = locations.findIndex(x => x.id === parseInt(req.params.id))

    if (index ===-1) {
        res.status(404).send({ error: "Actor not found." })
        return
    }

    locations[index]={...locations[index],...req.body}

    res.status(200).json(locations[index])   

}
exports.deleteById = function (req, res) {   //Delete
    if (!(parseInt(req.params.id) > 0)) {
        res.status(400).send({ error: "ID must be a positive integer" })
        return
    }
    const index = locations.findIndex(x => x.id === parseInt(req.params.id))

    if (index ===-1) {
        res.status(404).send({ error: "Actor not found." })
        return
    }
    locations.splice(index,1)
    res.status(204).send()
}