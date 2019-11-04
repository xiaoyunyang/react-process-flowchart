import { sort } from "ramda";
import MinHeap, { HeapElemT } from "../../lib/utils/MinHeap";

// get random int between 0 and max-1
const getRandomInt = (max: number): number => Math.floor(Math.random() * Math.floor(max));


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
    let leftHeapValid = true;
    let rightHeapValid = true;
    if (leftChild) {
        if (leftChild.priority < curr.priority) return false;
        leftHeapValid = verifyInvariant(heapArr, leftChildInd);
    }
    if (rightChild) {
        if (rightChild.priority < curr.priority) return false;
        rightHeapValid = verifyInvariant(heapArr, leftChildInd);
    }

    return leftHeapValid && rightHeapValid;
};

describe("verifyInvariant", () => {
    it("should verify min heap properties correctly for not a min heap", () => {
        const heap = [
            { val: "a", priority: 0 },
            { val: "a", priority: 12 },
            { val: "a", priority: 13 },
            { val: "a", priority: 1 }
        ];
        expect(verifyInvariant(heap, 1)).toBe(false);
    });
    it("should verify min heap properties correctly for a min heap", () => {
        const heap = [
            { val: "a", priority: 0 },
            { val: "a", priority: 1 },
            { val: "a", priority: 2 },
            { val: "a", priority: 3 }
        ];
        expect(verifyInvariant(heap, 1)).toBe(true);
    });
});

describe("MinHeap", () => {
    describe("Insert and remove special case", () => {
        const h: MinHeap = new MinHeap();
        let mins: (HeapElemT | undefined)[] = [];
        const elems = [
            { val: "t1", priority: 2.7 },
            { val: "t2", priority: 2.2 },
            { val: "t3", priority: 2.1 },
            { val: "t4", priority: 2.6 },
            { val: "t5", priority: 2.5 },
            { val: "t6", priority: 2.3 },
            { val: "t7", priority: 2.4 },
            { val: "t8", priority: 2.8 },
            { val: "e0", priority: 4 }
        ];
        test.each(
            elems
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
            const prios = mins.map((min) => (min && min.priority) as number);
            const sortBy = (a: number, b: number) => a - b;
            expect(prios).toEqual(sort(sortBy, prios));
        });
    });
    describe("Insert and remove randomized testing", () => {
        const h: MinHeap = new MinHeap();
        let mins: (HeapElemT | undefined)[] = [];
        const elems = [
            { val: "a", priority: 0 },
            { val: "a1", priority: 0 },
            { val: "b", priority: 1 },
            { val: "c", priority: 2 },
            { val: "c1", priority: 2 },
            { val: "d", priority: 3 },
            { val: "e", priority: 4 },
            { val: "f", priority: 5 }
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
            const prios = mins.map((min) => (min && min.priority) as number);
            const sortBy = (a: number, b: number) => a - b;
            expect(prios).toEqual(sort(sortBy, prios));
        });
    });

    describe("Edge Cases", () => {
        let h: MinHeap;
        let mins: (HeapElemT | undefined)[];

        beforeEach(() => {
            h = new MinHeap();
            mins = [];
        });
        it("should remove in the same order as insertion for elements of same priority", () => {
            const elems = [
                { val: "a", priority: 0 },
                { val: "a1", priority: 0 },
                { val: "a2", priority: 0 }
            ];

            elems.forEach((elem) => h.insert(elem));
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
