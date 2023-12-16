use std::{collections::HashMap, fs};

pub fn main() {
    // let contents = fs::read_to_string("day1.txt").expect("Something went wrong reading the file");
    let contents = "nrtjrkkfour6fivefour7fivertjnxbbzg".to_string();
    let mut map = HashMap::new();
    map.insert("one", "1");
    map.insert("two", "2");
    map.insert("three", "3");
    map.insert("four", "4");
    map.insert("five", "5");
    map.insert("six", "6");
    map.insert("seven", "7");
    map.insert("eight", "8");
    map.insert("nine", "9");
    let config = day_1::Config {
        num_words: vec![
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "one", "two", "three", "four", "five",
            "six", "seven", "eight", "nine",
        ],
        map,
    };
    day_1::trebuchet(contents, &config);
}
