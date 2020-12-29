class MyArray<T = string | number> {

  private collection: Array<T> = [];

  add(value: T): void {
    this.collection.push(value)
  }

  remove(value: T): void {
    // Remove items using splice
    // Slower than forloop when array size is small, Fast when the array size is large
    let index = this.collection.indexOf(value);
    if (index !== -1) {
      this.collection.splice(index, 1);
    }

    // Remove items using filter
    // Simplest one liner when performance is not of much concern or if you want to chain few operations
    // this.collection = this.collection.filter(item => item !== value);

    // Remove items using forloop
    // Fast when array size is small, slow when array becomes large
    // let newCollection = [];
    // let collectionSize = this.collection.length;
    // for (let i = 0; i < collectionSize; i++) {
    //   if (this.collection[i] !== value) {
    //     newCollection.push(this.collection[i]);
    //   }
    // }
    // this.collection = newCollection;
  }

  getValues(): Array<T> {
    return this.collection;
  }
}

const stringAry = new MyArray();
stringAry.add('aaa');
stringAry.add('bbb');
stringAry.add('ccc');
stringAry.remove('bbb');
console.log(stringAry.getValues());

const numberAry = new MyArray();
numberAry.add(1);
numberAry.add(2);
numberAry.add(3);
numberAry.remove(2);
console.log(numberAry.getValues());

const booleanAry = new MyArray()
booleanAry.add(true);
booleanAry.add(false);

const typeMixedAry = new MyArray<number>();
typeMixedAry.add(1);
typeMixedAry.add('bbb');