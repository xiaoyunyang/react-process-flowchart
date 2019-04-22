import { sort } from "ramda";
import MinHeap, { HeapElemT } from "../MinHeap";

// get random int between 0 and max-1
const getRandomInt = (max: number): number =>
    Math.floor(Math.random() * Math.floor(max));


// Fisher-Yates Shuffle
const shuffle = (arr: any[]): any[] => {
    const a = [...arr];

    function swap(i: number, j: number) {
        const temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }

    let j = 0;
    for (let i = 0; i < arr.length - 2; i += 1) {
        j = getRandomInt(i);
        swap(i, j);
    }
    return a;
};

const verifyInvariant = (
    heapArr: { val: string; priority: number }[],
    currInd: number
): boolean => {
    if (heapArr.length < 2) return true;

    const curr = heapArr[currInd];
    const leftChildInd = currInd * 2;
    const rightChildInd = (currInd * 2) + 1;
    const leftChild = heapArr[leftChildInd];
    const rightChild = heapArr[rightChildInd];

    if (!leftChild && !rightChild) return true;
    if (leftChild && leftChild < curr) return false;
    if (rightChild && rightChild < curr) return false;

    if (!leftChild && rightChild) {
        return rightChild >= curr && verifyInvariant(heapArr, rightChildInd);
    }
    if (!rightChild && leftChild) {
        return leftChild >= curr && verifyInvariant(heapArr, leftChildInd);
    }

    return leftChild >= curr && verifyInvariant(heapArr, leftChildInd)
        && rightChild >= curr && verifyInvariant(heapArr, rightChildInd);
};

describe("MinHeap", () => {
    let h: MinHeap;
    let mins: (HeapElemT | undefined)[];
    beforeEach(() => {
        h = new MinHeap();
        mins = [];
    });
    describe("Insert and remove randomized testing", () => {
        const elems = [
            { val: "a", priority: 0 },
            { val: "a1", priority: 0 },
            { val: "b", priority: 1 },
            { val: "c", priority: 2 },
            { val: "c1", priority: 2 },
            { val: "d", priority: 3 },
            { val: "e", priority: 4 },
            { val: "f", priority: 5 },
        ];
        test.each(
            shuffle(elems)
        )("maintain min heap invariant after inserting element %o", (elem: { val: string; priority: number }) => {
            h.insert(elem);
            expect(verifyInvariant(h.getHeap(), 1)).toBe(true);
        });

        test.each(
            elems
        )("maintain min heap invariant after removing element", () => {
            const min = h.deleteMin();
            mins = mins.concat(min);
            expect(verifyInvariant(h.getHeap(), 1)).toBe(true);
        });

        it("should remove min priority element from heap", () => {
            const prios = mins.map(min => (min && min.priority) as number);
            const sortBy = (a: number, b: number) => a - b;
            expect(prios).toEqual(sort(sortBy, prios));
        });
    });

    describe("Edge Cases", () => {
        it("should remove in the same order as insertion for elements of same priority", () => {
            const elems = [
                { val: "a", priority: 0 },
                { val: "a1", priority: 0 },
                { val: "a2", priority: 0 },
            ];

            elems.forEach(elem => h.insert(elem));
            for (let i = 0; i < elems.length; i += 1) {
                mins = mins.concat(h.deleteMin());
            }
            expect(mins).toEqual(elems);
        });
        it("should return undefined if deleting min from empty heap", () => {
            const min = h.deleteMin();
            expect(min).toBe(undefined);
        });
        it("should return undefined when getMin from empty heap", () => {
            expect(h.getMin()).toBe(undefined);
        });
    });
});