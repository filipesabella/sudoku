export class ImmutableSet<T> {
  readonly length: number;

  constructor(private readonly data: T[]) {
    this.length = data.length;
  }

  filter(f: (t: T) => boolean): ImmutableSet<T> {
    return new ImmutableSet(this.data.filter(f));
  }

  forEach(f: (t: T) => void): void {
    this.data.forEach(f);
  }

  toggle(t: T): ImmutableSet<T> {
    if (this.data.includes(t)) {
      return new ImmutableSet(this.data.filter(e => e !== t));
    } else {
      return new ImmutableSet(this.data.concat(t));
    }
  }
}
