function is_palindrome(str1) {
    let original = str1.toLowerCase();
    let arr = original.split("");
    let start = 0;
    let end = arr.length - 1;
    while (start < end) {
        let temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;

        start++;
        end--;
    }
    let reversed = arr.join("");
    console.log(original === reversed);
}

is_palindrome("AmmA");