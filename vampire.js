class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {        
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfPeople = 0;
    let currentVamp = this;

    while (currentVamp.creator) {
      currentVamp = currentVamp.creator;
      numberOfPeople++;
    }

    return numberOfPeople;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    let numberOfPeople = 0;
    let currentVamp = this;

    while (currentVamp.creator) {
      currentVamp = currentVamp.creator;
      numberOfPeople++;
    }

    let numberOfPeople2 = 0;
    let secondVamp = vampire;

    while (secondVamp.creator) {
      secondVamp = secondVamp.creator;
      numberOfPeople2++;
    }

    if (numberOfPeople < numberOfPeople2) {
      return true;
    } else {
      return false;
    }    
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

  }

    // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {            

    if (this.name === name) {
      return this;
    } else if (name === ' ') {
      return null;
    }

    for (const child of this.offspring) {
      const found = child.vampireWithName(name);
      if (found) {
        return found;
      }
    }

    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let count = 0;

    for (const child of this.offspring) {
      count++;
      count += child.totalDescendents;
    }

    return count;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millennials = [];

    if (this.yearConverted > 1980) {
      millennials.push(this);
    }

    for (const child of this.offspring) {
      millennials = millennials.concat(child.allMillennialVampires);
    }

    return millennials;
  }
}

module.exports = Vampire;