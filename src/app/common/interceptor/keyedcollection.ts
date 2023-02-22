export interface IKeyedCollection<T> {
  add(key: string, value: T): any;

  containsKey(key: string): boolean;

  count(): number;

  itemList(): { [index: string]: T };

  item(key: string): T;

  keys(): string[];

  removeAll(): any;

  remove(key: string): T;

  values(): T[];

  fromJson(json: string): any;

  fromData(data: any): any;

  toJson(): any;
}

export class KeyedCollection<T> implements IKeyedCollection<T> {
  private _items: { [index: string]: T } = {};

  private _length = 0;

  public containsKey(key: string): boolean {
    return this._items.hasOwnProperty(key);
  }

  public count(): number {
    return this._length;
  }

  public add(key: string, value: T) {
    if (!this._items.hasOwnProperty(key)) {
      this._length++;
    }
    this._items[key] = value;
  }

  public removeAll() {
    this._items = {};
    this._length = 0;
  }

  public remove(key: string): T {
    const val = this._items[key];
    delete this._items[key];
    this._length--;
    this._length = this._length <= 0 ? 0 : this._length;
    return val;
  }

  public item(key: string): T {
    return this._items[key];
  }

  public itemList(): { [index: string]: T } {
    return this._items;
  }

  public keys(): string[] {
    const keySet: string[] = [];
    for (const prop in this._items) {
      if (this._items.hasOwnProperty(prop)) {
        keySet.push(prop);
      }
    }

    return keySet;
  }

  public values(): T[] {
    const values: T[] = [];
    for (const prop in this._items) {
      if (this._items.hasOwnProperty(prop)) {
        values.push(this._items[prop]);
      }
    }

    return values;
  }

  public fromJson(json: string) {
    try {
      const list: { [index: string]: T } = JSON.parse(json);
      for (const item in list) {
        if (list.hasOwnProperty(item)) {
          this.add(item, list[item]);
        }
      }
    } catch (err) {
      this._items = {};
      this._length = 0;
    }
  }

  public fromData(data: any) {
    try {
      for (const datum in data) {
        if (data.hasOwnProperty(datum)) {
          this.add(datum, data[datum]);
        }
      }
    } catch (err) {
      this._items = {};
      this._length = 0;
    }
  }

  public toJson(): string {
    return JSON.stringify(this._items);
  }
}
