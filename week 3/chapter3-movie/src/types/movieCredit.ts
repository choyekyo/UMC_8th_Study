export type PersonBase = {
  id: number;
  name: string;
  profile_path: string;
};

export type Actor = PersonBase & {
  character: string;
};

export type Director = PersonBase & {
  job: string;
};

export type Credits = {
  cast: Actor[];
  crew: Director[];
};