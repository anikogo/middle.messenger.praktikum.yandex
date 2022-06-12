class DuoArray<T> {
    itemOne: T;
    itemTwo: T;

    constructor(itemOne, itemTwo) {
        this.itemOne = itemOne;
        this.itemTwo = itemTwo;
    }

    render() {
        return `${this.itemOne} + ${this.itemTwo}`;
    }
}