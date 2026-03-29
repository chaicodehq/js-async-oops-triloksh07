/**
 * 🏏 Cricket Academy Management - Inheritance: extends & super
 *
 * Cricket academy ka management system banana hai! Base Player class hai,
 * aur usse extend karke Batsman, Bowler, aur AllRounder classes banao.
 * `extends` se inheritance milega aur `super` se parent constructor aur
 * methods call honge. Har player type ki apni specialty hai!
 *
 * Class: Player (Base Class)
 *
 *   constructor(name, age, team)
 *     - this.name, this.age, this.team
 *     - this.trainingHours = 0
 *
 *   getProfile()
 *     - Returns { name, age, team, role: "player", trainingHours }
 *
 *   train(hours)
 *     - Adds hours to this.trainingHours
 *     - hours must be > 0, otherwise return -1
 *     - Returns updated this.trainingHours
 *
 *   getTrainingHours()
 *     - Returns this.trainingHours
 *
 *
 * Class: Batsman extends Player
 *
 *   constructor(name, age, team, battingStyle)
 *     - Call super(name, age, team)
 *     - this.battingStyle = battingStyle ("right-hand" or "left-hand")
 *     - this.innings = []
 *
 *   playInnings(runs, balls)
 *     - Validates runs >= 0 and balls > 0
 *     - Calculates strikeRate for this innings: (runs / balls) * 100
 *     - Pushes { runs, balls, strikeRate } to this.innings
 *     - Returns the innings object
 *     - Invalid input returns null
 *
 *   getStrikeRate()
 *     - Returns average strikeRate across all innings
 *     - Agar no innings, return 0
 *
 *   getProfile() [OVERRIDE]
 *     - Returns { ...super.getProfile(), battingStyle, role: "batsman",
 *       totalRuns: sum of all innings runs,
 *       inningsPlayed: this.innings.length }
 *
 *
 * Class: Bowler extends Player
 *
 *   constructor(name, age, team, bowlingStyle)
 *     - Call super(name, age, team)
 *     - this.bowlingStyle = bowlingStyle ("fast", "spin", or "medium")
 *     - this.spells = []
 *
 *   bowlSpell(wickets, runsConceded, overs)
 *     - Validates wickets >= 0, runsConceded >= 0, overs > 0
 *     - Calculates economy: runsConceded / overs
 *     - Pushes { wickets, runsConceded, overs, economy } to this.spells
 *     - Returns the spell object
 *     - Invalid input returns null
 *
 *   getEconomy()
 *     - Returns average economy across all spells
 *     - Agar no spells, return 0
 *
 *   getProfile() [OVERRIDE]
 *     - Returns { ...super.getProfile(), bowlingStyle, role: "bowler",
 *       totalWickets: sum of all spell wickets,
 *       spellsBowled: this.spells.length }
 *
 *
 * Class: AllRounder extends Player
 *
 *   constructor(name, age, team, battingStyle, bowlingStyle)
 *     - Call super(name, age, team)
 *     - this.battingStyle, this.bowlingStyle
 *     - this.innings = [], this.spells = []
 *
 *   playInnings(runs, balls)
 *     - Same logic as Batsman.playInnings
 *
 *   bowlSpell(wickets, runsConceded, overs)
 *     - Same logic as Bowler.bowlSpell
 *
 *   getStrikeRate()
 *     - Same logic as Batsman.getStrikeRate
 *
 *   getEconomy()
 *     - Same logic as Bowler.getEconomy
 *
 *   getProfile() [OVERRIDE]
 *     - Returns { ...super.getProfile(), battingStyle, bowlingStyle,
 *       role: "allrounder",
 *       totalRuns: sum of all innings runs,
 *       totalWickets: sum of all spell wickets,
 *       inningsPlayed: this.innings.length,
 *       spellsBowled: this.spells.length }
 *
 * Rules:
 *   - Always use super() in child constructors
 *   - Override getProfile() in each child class
 *   - battingStyle must be "right-hand" or "left-hand"
 *   - bowlingStyle must be "fast", "spin", or "medium"
 *   - All numeric validations: runs >= 0, balls/overs > 0, wickets >= 0
 *   - AllRounder has BOTH batting and bowling capabilities
 *
 * @example
 *   const virat = new Batsman("Virat", 35, "India", "right-hand");
 *   virat.train(5);
 *   virat.playInnings(82, 53);
 *   virat.getProfile();
 *   // => { name: "Virat", age: 35, team: "India", role: "batsman",
 *   //      trainingHours: 5, battingStyle: "right-hand", totalRuns: 82, inningsPlayed: 1 }
 *
 * @example
 *   const bumrah = new Bowler("Bumrah", 30, "India", "fast");
 *   bumrah.bowlSpell(3, 25, 4);
 *   bumrah.getEconomy();  // => 6.25
 *
 * @example
 *   const hardik = new AllRounder("Hardik", 30, "India", "right-hand", "medium");
 *   hardik.playInnings(71, 30);
 *   hardik.bowlSpell(2, 30, 4);
 *   hardik.getProfile();
 *   // => { ..., role: "allrounder", totalRuns: 71, totalWickets: 2, ... }
 */
export class Player {
  constructor(name, age, team) {
    this.name = name;
    this.age = age;
    this.team = team;
    this.trainingHours = 0;
  }

  getProfile() {
    return { name: this.name, age: this.age, team: this.team, role: "player", trainingHours: this.trainingHours };
  }

  train(hours) {
    if (hours <= 0 || Number.isNaN(hours)) return -1;
    return this.trainingHours += hours;
  }

  getTrainingHours() {
    return this.trainingHours;
  }
}

// Batsman extends Player and tracks batting performance.
// Keeps both innings history and running totals so stats can be calculated efficiently.
export class Batsman extends Player {
  constructor(name, age, team, battingStyle) {
    super(name, age, team);
    this.battingStyle = battingStyle;

    // store every innings so we have match history and detailed stats later
    this.innings = [];

    // running totals so we don’t have to loop through innings every time
    this.totalRuns = 0;
    this.totalBalls = 0;

    // we keep sum of strike rates to calculate average strike rate quickly
    this.totalStrikeRate = 0;
  }

  playInnings(runs, balls) {
    if (runs < 0 || balls <= 0 || Number.isNaN(runs) || Number.isNaN(balls)) return null;

    const strikeRate = (runs / balls) * 100;
    const innings = { runs, balls, strikeRate };

    this.totalRuns += runs;
    this.totalBalls += balls;
    this.totalStrikeRate += strikeRate;

    this.innings.push(innings);

    return innings;
  }

  getStrikeRate() {
    if (this.innings.length === 0) return 0;
    return this.totalStrikeRate / this.innings.length;
  }

  getProfile() {
    const profile = {
      ...super.getProfile(),
      battingStyle: this.battingStyle,
      totalRuns: this.totalRuns,
      inningsPlayed: this.innings.length,
      role: "batsman",
    };


    return profile;
  }
}

// Bowler extends Player and tracks bowling spells.
// Uses running totals to avoid recalculating stats from scratch every time.
export class Bowler extends Player {
  constructor(name, age, team, bowlingStyle) {
    super(name, age, team);
    this.bowlingStyle = bowlingStyle;
    this.spells = [];

    // running totals for quick stats calculation without looping spells
    this.totalWickets = 0;
    this.totalRunsConceded = 0;
    this.totalOvers = 0;

    // sum of economies so we can compute average economy per spell
    this.totalEconomy = 0;
  }

  bowlSpell(wickets, runsConceded, overs) {
    if (wickets < 0 || runsConceded < 0 || overs <= 0 || Number.isNaN(wickets) || Number.isNaN(runsConceded) || Number.isNaN(overs)) return null;

    const economy = runsConceded / overs;

    this.totalRunsConceded += runsConceded;
    this.totalOvers += overs;
    this.totalWickets += wickets;
    this.totalEconomy += economy;

    const spell = { wickets, runsConceded, overs, economy };

    this.spells.push(spell);

    return spell;
  }

  getEconomy() {
    if (this.spells.length === 0) return 0;
    return this.totalEconomy / this.spells.length;
  }

  getProfile() {
    const profile = {
      ...super.getProfile(),
      bowlingStyle: this.bowlingStyle,
      totalWickets: this.totalWickets,
      spellsBowled: this.spells.length,
      role: "bowler"
    };

    return profile;
  }
}

// AllRounder combines both batting and bowling stats.
// Maintains separate histories and aggregates for both roles.
export class AllRounder extends Player {
  constructor(name, age, team, battingStyle, bowlingStyle) {
    super(name, age, team);

    this.battingStyle = battingStyle;
    this.bowlingStyle = bowlingStyle;

    // keep full history of batting and bowling performance
    this.innings = [];
    this.spells = [];

    // running totals for performance metrics
    this.totalRuns = 0;
    this.totalBalls = 0;

    // we store sums so averages can be calculated in O(1) instead of looping arrays
    this.totalStrikeRate = 0; //  average strike rate per innings
    this.totalWickets = 0;
    this.totalEconomy = 0; //  average economy per spell
  }

  playInnings(runs, balls) {
    if (runs < 0 || balls <= 0 || Number.isNaN(runs) || Number.isNaN(balls)) return null;

    const strikeRate = (runs / balls) * 100;
    const innings = { runs, balls, strikeRate };

    this.totalRuns += runs;
    this.totalBalls += balls;
    this.totalStrikeRate += strikeRate;

    this.innings.push(innings);

    return innings;
  }

  bowlSpell(wickets, runsConceded, overs) {
    if (wickets < 0 || runsConceded < 0 || overs <= 0 || Number.isNaN(wickets) || Number.isNaN(runsConceded) || Number.isNaN(overs)) return null;

    const economy = runsConceded / overs;
    const spell = { wickets, runsConceded, overs, economy };

    this.totalWickets += wickets;
    this.totalEconomy += economy;

    this.spells.push(spell);

    return spell;
  }

  getStrikeRate() {
    if (this.innings.length === 0) return 0;
    return this.totalStrikeRate / this.innings.length;
  }

  getEconomy() {
    if (this.spells.length === 0) return 0;
    return this.totalEconomy / this.spells.length;
  }

  getProfile() {
    const profile = {
      ...super.getProfile(),
      battingStyle: this.battingStyle,
      bowlingStyle: this.bowlingStyle,
      totalRuns: this.totalRuns,
      totalWickets: this.totalWickets,
      inningsPlayed: this.innings.length,
      spellsBowled: this.spells.length,
      role: "allrounder"
    };

    return profile;
  }
}
