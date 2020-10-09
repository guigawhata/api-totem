declare namespace Express {
  export interface Request {
    connectedTotems: {
      [totem_id: string]: string;
    };
  }
}
