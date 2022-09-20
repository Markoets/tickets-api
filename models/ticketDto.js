module.exports = class TicketDTO {
    id;
    name;
    cast;
    price;
  
    constructor(data) {
      this.id = data.id;
      this.name = data.name;
      this.cast = data.cast;
      this.price = data.price;
    }
  }

  