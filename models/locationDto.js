module.exports = class LocationDTO {
    id;
    country;
    city;
    street;
  
    constructor(data) {
      this.id = data.id;
      this.country = data.country;
      this.city = data.city;
      this.street = data.street;
    }
  }

  