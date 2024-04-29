class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val: number = 0, next: ListNode | null = null) {
        this.val = val;
        this.next = next;
    }
}



class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class UtilityFunctions {
    // Задание 1: Проверка числа на палиндром
    isPalindrome(x: number): boolean {
        if (x < 0) return false;
        let reversed = 0, original = x;
        while (x > 0) {
            reversed = reversed * 10 + x % 10;
            x = Math.floor(x / 10);
        }
        return original === reversed;
    }

    // Задание 2: Находит индексы двух чисел, дающих в сумме заданное значение
    twoSum(nums: number[], target: number): number[] {
        const map: {[key: number]: number} = {};
        for (let i = 0; i < nums.length; i++) {
            const complement = target - nums[i];
            if (map[complement] !== undefined) {
                return [map[complement], i];
            }
            map[nums[i]] = i;
        }
        return [];
    }

    // Задание 3: Конвертирует римские числа в арабские
    romanToInt(s: string): number {
        const roman: {[key: string]: number} = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000};
        let total = 0;
        for (let i = 0; i < s.length; i++) {
            const current = roman[s[i]];
            const next = roman[s[i + 1]] || 0;
            if (current < next) {
                total -= current;
            } else {
                total += current;
            }
        }
        return total;
    }

    // Задание 4: Находит самый длинный общий префикс
    longestCommonPrefix(strs: string[]): string {
        if (!strs.length) return '';
        let prefix = strs[0];
        for (const str of strs) {
            while (str.indexOf(prefix) !== 0) {
                prefix = prefix.substring(0, prefix.length - 1);
                if (!prefix) return '';
            }
        }
        return prefix;
    }

    // Задание 5: Объединение двух отсортированных связных списков в один отсортированный список
    mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
        let dummy = new ListNode(-1);
        let current = dummy;
        while (list1 !== null && list2 !== null) {
            if (list1.val <= list2.val) {
                current.next = list1;
                list1 = list1.next;
            } else {
                current.next = list2;
                list2 = list2.next;
            }
            current = current.next;
        }
        current.next = list1 !== null ? list1 : list2;
        return dummy.next;
    }

    // Задание 6: Проверка, совпадают ли два бинарных дерева
    isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
        if (!p && !q) return true;
        if (!p || !q || p.val !== q.val) return false;
        return this.isSameTree(p.left, q.left) && this.isSameTree(p.right, q.right);
    }

    // Задание 7: Удаление повторяющихся элементов из массива чисел
    removeDuplicates(nums: number[]): number[] {
        return [...new Set(nums)];
    }

    // Задание 8: Определение, является ли число счастливым
    isHappy(n: number): boolean {
        const seen: Set<number> = new Set();
        while (n !== 1 && !seen.has(n)) {
            seen.add(n);
            n = this.getSumOfSquares(n);
        }
        return n === 1;
    }

    private getSumOfSquares(num: number): number {
        let sum = 0;
        while (num > 0) {
            let digit = num % 10;
            sum += digit * digit;
            num = Math.floor(num / 10);
        }
        return sum;
    }

    // Задание 9: Определение, является ли число степенью числа 2
    isPowerOfTwo(n: number): boolean {
        if (n <= 0) return false;
        return (n & (n - 1)) === 0;
    }

    // Задание 10: Проверка соответствия строки паттерну
    wordPattern(pattern: string, s: string): boolean {
        const words = s.split(' ');
        if (pattern.length !== words.length) return false;
        const charMap = new Map();
        const wordMap = new Map();

        for (let i = 0; i < words.length; i++) {
            const char = pattern.charAt(i);
            const word = words[i];

            if (charMap.has(char) && charMap.get(char) !== word || wordMap.has(word) && wordMap.get(word) !== char) {
                return false;
            }

            charMap.set(char, word);
            wordMap.set(word, char);
        }
        return true;
    }
}

// Пример использования
const utils = new UtilityFunctions();
console.log("Task 1: Is 121 a palindrome?", utils.isPalindrome(121)); // true
console.log("Task 2: Two Sum for [2, 7, 11, 15] with target 9:", utils.twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log("Task 3: Roman numeral MCMXCIV is:", utils.romanToInt("MCMXCIV")); // 1994
console.log("Task 4: Longest common prefix for ['flower','flow','flight']:", utils.longestCommonPrefix(["flower","flow","flight"])); // "fl"
console.log("Task 5: Merged list from [1,2,4] and [1,3,4]:", utils.mergeTwoLists(new ListNode(1, new ListNode(2, new ListNode(4))), new ListNode(1, new ListNode(3, new ListNode(4))))); // Outputs merged list
console.log("Task 6: Are trees [1,2,3] and [1,2,3] the same?", utils.isSameTree(new TreeNode(1, new TreeNode(2), new TreeNode(3)), new TreeNode(1, new TreeNode(2), new TreeNode(3)))); // true
console.log("Task 7: Remove duplicates from [1,1,2,2,3,3]:", utils.removeDuplicates([1,1,2,2,3,3])); // [1,2,3]
console.log("Task 8: Is 19 a happy number?", utils.isHappy(19)); // true
console.log("Task 9: Is 16 a power of two?", utils.isPowerOfTwo(16)); // true
console.log("Task 10: Does 'dog cat cat dog' match pattern 'abba'?", utils.wordPattern('abba', 'dog cat cat dog')); // true
