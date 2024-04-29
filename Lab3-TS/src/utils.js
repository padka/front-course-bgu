var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var ListNode = /** @class */ (function () {
    function ListNode(val, next) {
        if (val === void 0) { val = 0; }
        if (next === void 0) { next = null; }
        this.val = val;
        this.next = next;
    }
    return ListNode;
}());
var TreeNode = /** @class */ (function () {
    function TreeNode(val, left, right) {
        if (val === void 0) { val = 0; }
        if (left === void 0) { left = null; }
        if (right === void 0) { right = null; }
        this.val = val;
        this.left = left;
        this.right = right;
    }
    return TreeNode;
}());
var UtilityFunctions = /** @class */ (function () {
    function UtilityFunctions() {
    }
    // Задание 1: Проверка числа на палиндром
    UtilityFunctions.prototype.isPalindrome = function (x) {
        if (x < 0)
            return false;
        var reversed = 0, original = x;
        while (x > 0) {
            reversed = reversed * 10 + x % 10;
            x = Math.floor(x / 10);
        }
        return original === reversed;
    };
    // Задание 2: Находит индексы двух чисел, дающих в сумме заданное значение
    UtilityFunctions.prototype.twoSum = function (nums, target) {
        var map = {};
        for (var i = 0; i < nums.length; i++) {
            var complement = target - nums[i];
            if (map[complement] !== undefined) {
                return [map[complement], i];
            }
            map[nums[i]] = i;
        }
        return [];
    };
    // Задание 3: Конвертирует римские числа в арабские
    UtilityFunctions.prototype.romanToInt = function (s) {
        var roman = { 'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000 };
        var total = 0;
        for (var i = 0; i < s.length; i++) {
            var current = roman[s[i]];
            var next = roman[s[i + 1]] || 0;
            if (current < next) {
                total -= current;
            }
            else {
                total += current;
            }
        }
        return total;
    };
    // Задание 4: Находит самый длинный общий префикс
    UtilityFunctions.prototype.longestCommonPrefix = function (strs) {
        if (!strs.length)
            return '';
        var prefix = strs[0];
        for (var _i = 0, strs_1 = strs; _i < strs_1.length; _i++) {
            var str = strs_1[_i];
            while (str.indexOf(prefix) !== 0) {
                prefix = prefix.substring(0, prefix.length - 1);
                if (!prefix)
                    return '';
            }
        }
        return prefix;
    };
    // Задание 5: Объединение двух отсортированных связных списков в один отсортированный список
    UtilityFunctions.prototype.mergeTwoLists = function (list1, list2) {
        var dummy = new ListNode(-1);
        var current = dummy;
        while (list1 !== null && list2 !== null) {
            if (list1.val <= list2.val) {
                current.next = list1;
                list1 = list1.next;
            }
            else {
                current.next = list2;
                list2 = list2.next;
            }
            current = current.next;
        }
        current.next = list1 !== null ? list1 : list2;
        return dummy.next;
    };
    // Задание 6: Проверка, совпадают ли два бинарных дерева
    UtilityFunctions.prototype.isSameTree = function (p, q) {
        if (!p && !q)
            return true;
        if (!p || !q || p.val !== q.val)
            return false;
        return this.isSameTree(p.left, q.left) && this.isSameTree(p.right, q.right);
    };
    // Задание 7: Удаление повторяющихся элементов из массива чисел
    UtilityFunctions.prototype.removeDuplicates = function (nums) {
        return __spreadArray([], new Set(nums), true);
    };
    // Задание 8: Определение, является ли число счастливым
    UtilityFunctions.prototype.isHappy = function (n) {
        var seen = new Set();
        while (n !== 1 && !seen.has(n)) {
            seen.add(n);
            n = this.getSumOfSquares(n);
        }
        return n === 1;
    };
    UtilityFunctions.prototype.getSumOfSquares = function (num) {
        var sum = 0;
        while (num > 0) {
            var digit = num % 10;
            sum += digit * digit;
            num = Math.floor(num / 10);
        }
        return sum;
    };
    // Задание 9: Определение, является ли число степенью числа 2
    UtilityFunctions.prototype.isPowerOfTwo = function (n) {
        if (n <= 0)
            return false;
        return (n & (n - 1)) === 0;
    };
    // Задание 10: Проверка соответствия строки паттерну
    UtilityFunctions.prototype.wordPattern = function (pattern, s) {
        var words = s.split(' ');
        if (pattern.length !== words.length)
            return false;
        var charMap = new Map();
        var wordMap = new Map();
        for (var i = 0; i < words.length; i++) {
            var char = pattern.charAt(i);
            var word = words[i];
            if (charMap.has(char) && charMap.get(char) !== word || wordMap.has(word) && wordMap.get(word) !== char) {
                return false;
            }
            charMap.set(char, word);
            wordMap.set(word, char);
        }
        return true;
    };
    return UtilityFunctions;
}());
// Пример использования
var utils = new UtilityFunctions();
console.log("Task 1: Is 121 a palindrome?", utils.isPalindrome(121)); // true
console.log("Task 2: Two Sum for [2, 7, 11, 15] with target 9:", utils.twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log("Task 3: Roman numeral MCMXCIV is:", utils.romanToInt("MCMXCIV")); // 1994
console.log("Task 4: Longest common prefix for ['flower','flow','flight']:", utils.longestCommonPrefix(["flower", "flow", "flight"])); // "fl"
console.log("Task 5: Merged list from [1,2,4] and [1,3,4]:", utils.mergeTwoLists(new ListNode(1, new ListNode(2, new ListNode(4))), new ListNode(1, new ListNode(3, new ListNode(4))))); // Outputs merged list
console.log("Task 6: Are trees [1,2,3] and [1,2,3] the same?", utils.isSameTree(new TreeNode(1, new TreeNode(2), new TreeNode(3)), new TreeNode(1, new TreeNode(2), new TreeNode(3)))); // true
console.log("Task 7: Remove duplicates from [1,1,2,2,3,3]:", utils.removeDuplicates([1, 1, 2, 2, 3, 3])); // [1,2,3]
console.log("Task 8: Is 19 a happy number?", utils.isHappy(19)); // true
console.log("Task 9: Is 16 a power of two?", utils.isPowerOfTwo(16)); // true
console.log("Task 10: Does 'dog cat cat dog' match pattern 'abba'?", utils.wordPattern('abba', 'dog cat cat dog')); // true
