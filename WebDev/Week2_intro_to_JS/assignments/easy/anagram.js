function isAnagram(str1,str2){
    if (str1.length!=str2.length){
        return false;
    }
    if (str1.toLowerCase().split("").sort().join("")==str2.toLowerCase().split("").sort().join("")) {
        return true;
    }  
    return false;
}

isAnagram("Hello","olleH");