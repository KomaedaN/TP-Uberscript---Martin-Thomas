export class notEnougthMoneyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Argent manquant:";
  }
}

export class fetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Fetch erreur:";
  }
}
